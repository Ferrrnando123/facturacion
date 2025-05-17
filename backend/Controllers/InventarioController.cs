using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class InventarioController : ControllerBase
{
    private readonly InventarioService _inventario;

    public InventarioController(InventarioService inventario)
    {
        _inventario = inventario;
    }

    [HttpGet("bajo-stock")]
    public IActionResult GetBajoStock()
    {
        var productos = _inventario.ObtenerProductosBajoStock();
        return Ok(productos);
    }
}
