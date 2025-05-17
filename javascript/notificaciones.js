// notificaciones.js - Versión completa y actualizada
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const notificationList = document.getElementById('notification-list');
    const tabs = document.querySelectorAll('.tab');
    const notificationCount = document.getElementById('notification-count');
    
    // Cargar notificaciones al iniciar
    cargarNotificaciones();
    
    // Configurar tabs de filtrado
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filtrarNotificaciones(tab.dataset.filter);
        });
    });
    
    // Verificar nuevas notificaciones cada 30 segundos
    setInterval(cargarNotificaciones, 30000);
    
    // Función principal para cargar notificaciones
    async function cargarNotificaciones() {
        try {
            const response = await fetch('/api/notificaciones');
            if (!response.ok) throw new Error('Error al cargar notificaciones');
            
            const notificaciones = await response.json();
            renderizarNotificaciones(notificaciones);
            actualizarContador(notificaciones.length);
            
            // Parpadear el ícono de notificaciones en el navbar si hay nuevas
            if (notificaciones.length > 0) {
                const navNotif = document.querySelector('nav .alertas');
                if (navNotif) {
                    navNotif.classList.add('animate-pulse', 'text-red-500');
                    setTimeout(() => {
                        navNotif.classList.remove('animate-pulse', 'text-red-500');
                    }, 3000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Renderizar las notificaciones en el DOM
    function renderizarNotificaciones(notificaciones) {
        notificationList.innerHTML = '';
        
        if (notificaciones.length === 0) {
            notificationList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle text-green-400 text-4xl mb-3"></i>
                    <p class="text-gray-500">No hay notificaciones pendientes</p>
                </div>`;
            return;
        }
        
        notificaciones.forEach(notif => {
            const notificationCard = document.createElement('div');
            notificationCard.className = `notification-card ${notif.tipo === 'Crítico' ? 'critical' : 'warning'}`;
            notificationCard.dataset.type = notif.tipo === 'Crítico' ? 'critical' : 'warning';
            
            notificationCard.innerHTML = `
                <div class="notification-status"></div>
                <div class="notification-content">
                    <div class="notification-icon">
                        <i class="fas ${notif.tipo === 'Crítico' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                    </div>
                    <div class="notification-text">
                        <h3>${notif.nombreProducto} 
                            <span class="priority-tag ${notif.tipo === 'Crítico' ? 'priority-high' : 'priority-medium'}">
                                ${notif.tipo}
                            </span>
                        </h3>
                        <p>${notif.tipo === 'Crítico' ? 'Producto agotado' : `Stock bajo: ${notif.cantidad} unidades`}</p>
                        <div class="notification-meta">
                            <span><i class="fas fa-boxes"></i> ID: ${notif.productoId}</span>
                            <span><i class="fas fa-clock"></i> ${formatearFecha(notif.fecha)}</span>
                        </div>
                    </div>
                </div>
                <div class="notification-actions">
                    <button class="action-btn mark-read" title="Marcar como leída" data-id="${notif.id}">
                        <i class="far fa-check-circle"></i>
                    </button>
                    <button class="action-btn view-product" title="Ver producto" data-id="${notif.productoId}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>`;
            
            notificationList.appendChild(notificationCard);
        });
        
        // Configurar eventos para los botones
        configurarBotones();
    }
    
    // Configurar eventos de los botones
    function configurarBotones() {
        // Marcar como leída
        document.querySelectorAll('.mark-read').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const notificationId = e.currentTarget.dataset.id;
                await marcarComoLeida(notificationId);
                e.currentTarget.closest('.notification-card').remove();
                actualizarContador(document.querySelectorAll('.notification-card').length);
            });
        });
        
        // Ver producto
        document.querySelectorAll('.view-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                window.location.href = `inventario.html?highlight=${productId}`;
            });
        });
    }
    
    // Filtrar notificaciones por tipo
    function filtrarNotificaciones(filter) {
        const allNotifications = document.querySelectorAll('.notification-card');
        
        allNotifications.forEach(notification => {
            if (filter === 'all') {
                notification.style.display = '';
            } else {
                notification.style.display = notification.dataset.type === filter ? '' : 'none';
            }
        });
    }
    
    // Marcar notificación como leída en el backend
    async function marcarComoLeida(id) {
        try {
            await fetch(`/api/notificaciones/marcar-leida/${id}`, {
                method: 'POST'
            });
        } catch (error) {
            console.error('Error al marcar como leída:', error);
        }
    }
    
    // Actualizar el contador de notificaciones
    function actualizarContador(count) {
        if (notificationCount) {
            notificationCount.textContent = count;
            notificationCount.style.display = count > 0 ? 'block' : 'none';
        }
    }
    
    // Formatear fecha para mostrar
    function formatearFecha(fechaString) {
        const fecha = new Date(fechaString);
        return fecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
});