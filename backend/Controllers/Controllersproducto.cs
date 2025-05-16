using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class InventarioController : ControllerBase
{
    private readonly InventarioService _service;

    public InventarioController(InventarioService service)
    {
        _service = service;
    }

    [HttpGet("productos")]
    public IActionResult GetProductos()
    {
        var productos = _service.ObtenerProductos();
        return Ok(productos);
    }

    [HttpPost("productos")]
    public IActionResult AgregarProducto([FromBody] Producto producto)
    {
        _service.AgregarProducto(producto);
        return Ok();
    }

    [HttpGet("inventario")]
    public IActionResult GetInventario()
    {
        var inventario = _service.ObtenerInventarioCompleto();
        return Ok(inventario);
    }

    [HttpPost("inventario/agregar")]
    public IActionResult AgregarInventario([FromBody] InventarioItem item)
    {
        _service.AgregarAlInventario(item.ProductoId, item.Cantidad);
        return Ok();
    }

    [HttpPost("inventario/restar")]
    public IActionResult RestarInventario([FromBody] InventarioItem item)
    {
        var resultado = _service.RestarDelInventario(item.ProductoId, item.Cantidad);
        if (!resultado)
            return BadRequest("No hay suficiente stock o producto no encontrado");
        return Ok();
    }
}
