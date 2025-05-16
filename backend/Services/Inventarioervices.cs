using System.Collections.Generic;
using System.Linq;

public class InventarioService
{
    private readonly List<Producto> productos = new List<Producto>();
    private readonly List<InventarioItem> inventario = new List<InventarioItem>();

    // Agregar producto al catálogo de proveedores
    public void AgregarProducto(Producto producto)
    {
        productos.Add(producto);
    }

    // Obtener todos los productos
    public List<Producto> ObtenerProductos()
    {
        return productos;
    }

    // Agregar stock o crear inventario nuevo
    public void AgregarAlInventario(int productoId, int cantidad)
    {
        var item = inventario.FirstOrDefault(i => i.ProductoId == productoId);
        if (item != null)
        {
            item.Cantidad += cantidad;
        }
        else
        {
            inventario.Add(new InventarioItem
            {
                Id = inventario.Count + 1,
                ProductoId = productoId,
                Cantidad = cantidad
            });
        }
    }

    // Restar stock (por venta manual)
    public bool RestarDelInventario(int productoId, int cantidad)
    {
        var item = inventario.FirstOrDefault(i => i.ProductoId == productoId);
        if (item == null || item.Cantidad < cantidad)
        {
            return false; // No hay suficiente stock
        }

        item.Cantidad -= cantidad;
        return true;
    }

    // Obtener inventario completo con productos
    public List<(Producto producto, InventarioItem inventario)> ObtenerInventarioCompleto()
    {
        var query = from p in productos
                    join i in inventario on p.Id equals i.ProductoId into inv
                    from i in inv.DefaultIfEmpty()
                    select (producto: p, inventario: i ?? new InventarioItem { Cantidad = 0 });
        return query.ToList();
    }
}
