document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
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


});



window.addEventListener('DOMContentLoaded', () => {
  const filas = document.querySelectorAll('#tablaProductos tbody tr');

  filas.forEach(fila => {
    const celdaCantidad = fila.querySelector('.cantidad');
    const cantidad = parseInt(celdaCantidad.textContent);

    if (cantidad > 7) {
      celdaCantidad.textContent += ' (En stock)';
      celdaCantidad.style.color = 'green';
      celdaCantidad.style.fontWeight = 'bold';
    } else if (cantidad > 0 && cantidad <= 7) {
      celdaCantidad.textContent += ' (Por agotarse)';
      celdaCantidad.style.color = 'orange';
      celdaCantidad.style.fontWeight = 'bold';
    } else if (cantidad === 0) {
      celdaCantidad.textContent = 'Agotado';
      celdaCantidad.style.color = 'red';
      celdaCantidad.style.fontWeight = 'bold';
    }
  });
});


window.addEventListener('DOMContentLoaded', () => {
  const filas = document.querySelectorAll('#inventoryBody tr');

  filas.forEach(fila => {
    // La cantidad está en la 5ta celda (index 4)
    const celdaCantidad = fila.cells[4];
    // La celda donde mostramos el estado está en la 6ta celda (index 5)
    const celdaEstado = fila.cells[5];

    const cantidad = parseInt(celdaCantidad.textContent.trim());

    // Limpiamos contenido previo y creamos nuevo span para el estado
    celdaEstado.innerHTML = '';

    const spanEstado = document.createElement('span');
    spanEstado.classList.add('inline-block', 'px-2', 'py-1', 'rounded-full', 'text-xs', 'font-semibold');

    if (cantidad > 7) {
      spanEstado.textContent = 'En stock';
      spanEstado.classList.add('bg-green-100', 'text-green-800');
    } else if (cantidad > 0 && cantidad <= 7) {
      spanEstado.textContent = 'Por agotarse';
      spanEstado.classList.add('bg-yellow-100', 'text-yellow-800');
    } else if (cantidad === 0) {
      spanEstado.textContent = 'Agotado';
      spanEstado.classList.add('bg-red-100', 'text-red-800');
    } else {
      spanEstado.textContent = 'Sin dato';
      spanEstado.classList.add('bg-gray-100', 'text-gray-800');
    }

    celdaEstado.appendChild(spanEstado);
  });
});


