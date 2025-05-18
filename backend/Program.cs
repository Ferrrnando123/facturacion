/* SEGMENTO QUE EFECTUA LA FACTURA */

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

// Configuración clave: permite acceder a carpetas hermanas
builder.WebHost.UseContentRoot(Directory.GetCurrentDirectory());

var app = builder.Build();

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles(); 

app.MapPost("/procesar-pago", async (HttpRequest request) => 
{
    var form = await request.ReadFormAsync();
    
    // Ruta comprobada para salir de backend y entrar a estructura
    var templatePath = Path.Combine("..", "estructura", "factura.html");
    
    // Debug: Verifica la ruta física (opcional)
    Console.WriteLine($"🛠️ Ruta completa buscada: {Path.GetFullPath(templatePath)}");
    
    if (!File.Exists(templatePath))
    {
        return Results.Problem("❌ Error: La plantilla no está en: " + Path.GetFullPath(templatePath));
    }
    
    var htmlTemplate = await File.ReadAllTextAsync(templatePath);
    
    // Reemplazo de variables (igual que antes)
    var facturaHtml = htmlTemplate
        .Replace("{numeroFactura}", DateTime.Now.ToString("yyyyMMddHHmm"))
        .Replace("{fecha}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"))
        .Replace("{nombre}", form["Nombre"].ToString())
        .Replace("{correo}", form["Correo"].ToString())
        .Replace("{direccion}", form["Direccion"].ToString())
        .Replace("{telefono}", form["Telefono"].ToString())
        .Replace("{productos}", form["Productos"].ToString())
        .Replace("{total}", form["Total"].ToString());

    return Results.Content(facturaHtml, "text/html");
});

app.Run();

/* FINAL DEL SEGMENTO QUE EFECTUA LA FACTURA*/

/*--------------------------------------------------------------------------------------------------------------*/

