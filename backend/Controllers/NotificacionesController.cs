using Microsoft.AspNetCore.Mvc;
using NexusConstruction.Services;

namespace NexusConstruction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificacionesController : ControllerBase
    {
        private readonly NotificacionService _notificacionService;

        public NotificacionesController(NotificacionService notificacionService)
        {
            _notificacionService = notificacionService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_notificacionService.ObtenerNoLeidas());
        }

        [HttpPost("marcar-leida/{id}")]
        public IActionResult MarcarLeida(string id)
        {
            _notificacionService.MarcarComoLeida(Guid.Parse(id));
            return Ok();
        }
    }
}