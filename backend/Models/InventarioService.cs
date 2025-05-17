public class InventarioService
{
    private List<Producto> _productos;

    public InventarioService()
    {
        // Mock de datos (deberías cargarlos desde un archivo)
        _productos = new List<Producto>
        {
             new Producto { Id=1, Nombre="Martillo", Descripcion="Martillo de acero con mango de goma", Precio=25.0m, Cantidad=0, ImagenUrl="imagenes/img1.png" },
                new Producto { Id=2, Nombre="Destornillador", Descripcion="Destornillador plano de 6 pulgadas", Precio=10.0m, Cantidad=0, ImagenUrl="imagenes/img2.png" },
                new Producto { Id=3, Nombre="Clavos", Descripcion="Caja de clavos de 1 pulgada (500)", Precio=25.0m, Cantidad=10, ImagenUrl="imagenes/img3.jpg" },
                new Producto { Id=4, Nombre="Taladro", Descripcion="Taladro eléctrico de 500w", Precio=100.0m, Cantidad=10, ImagenUrl="imagenes/img4.jpg" },
                new Producto { Id=5, Nombre="Llave Inglesa", Descripcion="Llave ajustable de acero 12 pulgadas", Precio=15.0m, Cantidad=15, ImagenUrl="imagenes/img5.jpg" },
                new Producto { Id=6, Nombre="Cinta metrica", Descripcion="Cinta medidora 10mts", Precio=10.0m, Cantidad=10, ImagenUrl="imagenes/img6.jpg" },
                new Producto { Id=7, Nombre="Casco de seguridad", Descripcion="Casco protector anti golpes", Precio=30.0m, Cantidad=15, ImagenUrl="imagenes/img7.jpg" },
                new Producto { Id=8, Nombre="Compresor de aire", Descripcion="Máquina de compresión de aire 80psi", Precio=150.0m, Cantidad=5, ImagenUrl="imagenes/img8.jpg" },
                new Producto { Id=9, Nombre="Pintura blanca", Descripcion="Galón de pintura blanca mate", Precio=35.0m, Cantidad=8, ImagenUrl="imagenes/img9.jpg" },
                new Producto { Id=10, Nombre="Taladro inalámbrico", Descripcion="Taladro inalámbrico con batería recargable", Precio=120.0m, Cantidad=12, ImagenUrl="imagenes/img10.jpg" },
                new Producto { Id=11, Nombre="Pintura blanca", Descripcion="Baldes de pintura blanca mate 4L", Precio=45.0m, Cantidad=12, ImagenUrl="imagenes/img11.jpg" },
                new Producto { Id=12, Nombre="Cemento", Descripcion="Saco de cemento de 50kg", Precio=8.0m, Cantidad=8, ImagenUrl="imagenes/img12.jpg" },
                new Producto { Id=13, Nombre="Ladrillos", Descripcion="Caja con 50 ladrillos rojos", Precio=60.0m, Cantidad=25, ImagenUrl="imagenes/img13.jpg" },
                new Producto { Id=14, Nombre="Cable eléctrico", Descripcion="Rollo de cable 100m", Precio=120.0m, Cantidad=9, ImagenUrl="imagenes/img14.jpg" },
                new Producto { Id=15, Nombre="Tornillos", Descripcion="Caja con 200 tornillos de 2 pulgadas", Precio=18.0m, Cantidad=0, ImagenUrl="imagenes/img15.jpg" },
                new Producto { Id=16, Nombre="Escuadra", Descripcion="Escuadra metálica 30cm", Precio=12.0m, Cantidad=14, ImagenUrl="imagenes/img16.jpg" },
                new Producto { Id=17, Nombre="Pala", Descripcion="Pala de acero con mango de madera", Precio=35.0m, Cantidad=7, ImagenUrl="imagenes/img17.png" },
                new Producto { Id=18, Nombre="Cuerda", Descripcion="Rollo de cuerda nylon 50m", Precio=20.0m, Cantidad=3, ImagenUrl="imagenes/img18.jpg" },
                new Producto { Id=19, Nombre="Pintura roja", Descripcion="Baldes de pintura roja 4L", Precio=50.0m, Cantidad=20, ImagenUrl="imagenes/img19.jpg" },
                new Producto { Id=20, Nombre="Andamios", Descripcion="Andamios metálicos para construcción", Precio=5.0m, Cantidad=2, ImagenUrl="imagenes/img20.jpg" },
                new Producto { Id=21, Nombre="Martillo", Descripcion="Martillo de acero con mango de madera", Precio=25.0m, Cantidad=15, ImagenUrl="imagenes/img21.jpg" },
                new Producto { Id=22, Nombre="Llave inglesa", Descripcion="Llave inglesa ajustable 10\"", Precio=30.0m, Cantidad=7, ImagenUrl="imagenes/img22.jpg" },
                new Producto { Id=23, Nombre="Taladro", Descripcion="Taladro eléctrico inalámbrico 18V", Precio=150.0m, Cantidad=3, ImagenUrl="imagenes/img23.jpg" },
                new Producto { Id=24, Nombre="Nivel", Descripcion="Nivel de burbuja 60cm", Precio=22.0m, Cantidad=11, ImagenUrl="imagenes/img24.jpg" },
                new Producto { Id=25, Nombre="Sierra", Descripcion="Sierra manual de 18 pulgadas", Precio=40.0m, Cantidad=6, ImagenUrl="imagenes/img25.png" },
                new Producto { Id=26, Nombre="Cinta métrica", Descripcion="Cinta métrica 5m", Precio=10.0m, Cantidad=18, ImagenUrl="imagenes/img26.jpg" },
                new Producto { Id=27, Nombre="Pintura azul", Descripcion="Baldes de pintura azul 4L", Precio=55.0m, Cantidad=0, ImagenUrl="imagenes/img27.jpg" },
                new Producto { Id=28, Nombre="Escalera", Descripcion="Escalera plegable aluminio 3m", Precio=80.0m, Cantidad=9, ImagenUrl="imagenes/img28.jpg" },
                new Producto { Id=29, Nombre="Destornillador", Descripcion="Juego de destornilladores 6 piezas", Precio=15.0m, Cantidad=13, ImagenUrl="imagenes/img29.jpg" },
                new Producto { Id=30, Nombre="Pintura negra", Descripcion="Baldes de pintura negra 4L", Precio=48.0m, Cantidad=21, ImagenUrl="imagenes/img30.jpg" }
        };
        }
    public List<Producto> ObtenerProductosBajoStock() => 
        _productos.Where(p => p.Cantidad <= 3).ToList();

    public void ActualizarCantidad(int id, int cantidad)
    {
        var producto = _productos.FirstOrDefault(p => p.Id == id);
        if (producto != null) producto.Cantidad = cantidad;
    }
}