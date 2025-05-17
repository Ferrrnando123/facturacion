using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace NexusConstruction.Services
{
    public class NotificacionService
    {
        private static readonly ConcurrentDictionary<Guid, Notificacion> _notificaciones =
            new ConcurrentDictionary<Guid, Notificacion>();

        public void RegistrarNotificacion(Producto producto) // ✅ corregido aquí
        {
            var notificacion = new Notificacion
            {
                Id = Guid.NewGuid(),
                ProductoId = producto.Id,
                NombreProducto = producto.Nombre,
                Cantidad = producto.Cantidad,
                Fecha = DateTime.Now,
                Tipo = producto.Cantidad == 0 ? "Crítico" : "Advertencia",
                Leida = false
            };

            _notificaciones.TryAdd(notificacion.Id, notificacion);
        }

        public List<Notificacion> ObtenerNoLeidas()
        {
            return _notificaciones.Values
                .Where(n => !n.Leida)
                .OrderByDescending(n => n.Fecha)
                .ToList();
        }

        public void MarcarComoLeida(Guid id)
        {
            if (_notificaciones.TryGetValue(id, out var notificacion))
            {
                notificacion.Leida = true;
            }
        }

        public class Notificacion
        {
            public Guid Id { get; set; }
            public int ProductoId { get; set; }
            public required string NombreProducto { get; set; }
            public int Cantidad { get; set; }
            public DateTime Fecha { get; set; }
            public required string Tipo { get; set; }
            public bool Leida { get; set; }
        }
    }
}