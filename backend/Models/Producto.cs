public class Producto
{
    public int Id { get; set; }
    public required string Nombre { get; set; }
    public string Descripcion { get; set; }
    public decimal Precio { get; set; }
    public int Cantidad { get; set; }
    public string Estado => Cantidad switch
    {
        0 => "Agotado",
        <= 3 => "Por agotarse",
        _ => "En stock"
    };
    public string ImagenUrl { get; set; }
}