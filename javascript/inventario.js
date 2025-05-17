document.addEventListener('DOMContentLoaded', () => {
  // 1. Búsqueda en el inventario (MANTENER ESTO)
  const searchInput = document.querySelector('.search-bar input');
  const inventoryBody = document.getElementById('inventoryBody');
  const noResults = document.getElementById('noResults');
  
  searchInput.addEventListener('input', () => {
    const filtro = searchInput.value.toLowerCase().trim();
    const filas = Array.from(inventoryBody.querySelectorAll('tr'));
    let filasMostradas = 0;

    filas.forEach(fila => {
      const textoFila = fila.textContent.toLowerCase();
      if (textoFila.includes(filtro)) {
        fila.style.display = '';
        filasMostradas++;
      } else {
        fila.style.display = 'none';
      }
    });

    noResults.style.display = (filasMostradas === 0) ? 'block' : 'none';
  });

  // 2. Función para actualizar estados de stock (MODIFICADA)
  const actualizarEstadosStock = () => {
    document.querySelectorAll('#inventoryBody tr').forEach(fila => {
      const celdaCantidad = fila.querySelector('.cantidad');
      const celdaEstado = fila.querySelector('.estado');
      const cantidad = parseInt(celdaCantidad.textContent);
      
      celdaEstado.innerHTML = '';
      const span = document.createElement('span');
      span.className = 'inline-block px-2 py-1 rounded-full text-xs font-semibold ';
      
      if (cantidad === 0) {
        span.textContent = 'Crítico';
        span.classList.add('bg-red-100', 'text-red-800');
        fila.classList.add('bg-red-50'); // Fondo rojo claro para productos críticos
      } else if (cantidad <= 3) {
        span.textContent = 'Por agotarse';
        span.classList.add('bg-yellow-100', 'text-yellow-800');
      } else {
        span.textContent = 'En stock';
        span.classList.add('bg-green-100', 'text-green-800');
      }
      
      celdaEstado.appendChild(span);
    });
  };

  // 3. Función para actualizar stock (NUEVA VERSIÓN)
  async function actualizarStock(productoId, nuevaCantidad) {
    try {
      const response = await fetch('/api/inventario/actualizar-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ProductoId: productoId, 
          NuevaCantidad: nuevaCantidad 
        })
      });

      if (response.ok) {
        const resultado = await response.json();
        actualizarVista(productoId, nuevaCantidad);
        
        // Mostrar notificación flotante si es crítico
        if (nuevaCantidad <= 3) {
          mostrarNotificacionFlotante(productoId, nuevaCantidad);
        }
      }
    } catch (error) {
      console.error('Error al actualizar stock:', error);
    }
  }

  // 4. Función para mostrar notificación flotante (MODIFICADA)
  function mostrarNotificacionFlotante(productoId, cantidad) {
    if (document.getElementById('alerta-stock')) return;
    
    const productoNombre = document.querySelector(`tr[data-id="${productoId}"] .nombre-producto`).textContent;
    const alerta = document.createElement('div');
    alerta.id = 'alerta-stock';
    alerta.className = 'fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce';
    alerta.innerHTML = `
      <div class="flex items-start">
        <i class="fas fa-exclamation-triangle mt-1 mr-2"></i>
        <div>
          <h3 class="font-bold">${cantidad === 0 ? 'STOCK CRÍTICO' : 'STOCK BAJO'}</h3>
          <p>${productoNombre} - ${cantidad} unidades</p>
          <a href="notificaciones.html" class="text-white underline text-sm">Ver todas</a>
        </div>
        <button class="ml-4" onclick="this.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 10000);
  }

  // 5. Configurar botones de actualización (NUEVO)
  function configurarBotonesStock() {
    document.querySelectorAll('.btn-actualizar-stock').forEach(btn => {
      btn.addEventListener('click', function() {
        const fila = this.closest('tr');
        const productoId = fila.dataset.id;
        const nuevaCantidad = prompt("Nueva cantidad:");
        
        if (nuevaCantidad !== null && !isNaN(nuevaCantidad)) {
          actualizarStock(parseInt(productoId), parseInt(nuevaCantidad));
        }
      });
    });
  }

  // Inicialización
  actualizarEstadosStock();
  configurarBotonesStock();
});

// Función global para cerrar notificaciones
window.cerrarNotificacion = function(button) {
  button.closest('#alerta-stock').remove();
};