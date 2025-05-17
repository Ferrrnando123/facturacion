using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Servicios necesarios
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddSingleton<InventarioService>();
builder.Services.AddSingleton<EmailService>();

var app = builder.Build();

// Configuración de CORS (permitir todo)
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

app.UseRouting();
// Si tienes HTTPS local puedes activarlo
// app.UseHttpsRedirection();

app.MapControllers();

// Endpoint para procesar pagos
app.MapPost("/procesar-pago", async (HttpRequest request) =>
{
    try
    {
        var form = await request.ReadFormAsync();
        var nombre = form["Nombre"].ToString();
        var correo = form["Correo"].ToString();
        var productos = form["Productos"].ToString(); // Debe ser <tr>...</tr>
        var total = form["Total"].ToString();

        var facturaHtml = $@"
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Factura Nexus Construction</title>
            <style>
                body {{ font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; color: #333; }}
                .factura-container {{ max-width: 800px; margin: 0 auto; border: 1px solid #ccc; box-shadow: 0 0 5px #aaa; }}
                .header {{ background: #2c3e50; color: white; padding: 20px; text-align: center; }}
                .logo {{ font-size: 24px; color: #f39c12; }}
                .info-cliente, .detalle-factura, .footer {{ padding: 20px; }}
                table {{ width: 100%; border-collapse: collapse; }}
                th, td {{ padding: 10px; border: 1px solid #ddd; }}
                th {{ background: #f39c12; color: white; }}
                .total {{ font-weight: bold; }}
                .download-btn {{
                    display: block; margin: 20px auto; background: #27ae60; color: white;
                    text-align: center; padding: 10px; text-decoration: none; border-radius: 5px;
                }}
            </style>
        </head>
        <body>
            <div class='factura-container'>
                <div class='header'>
                    <div class='logo'>NEXUS CONSTRUCTION</div>
                    <h2>FACTURA #{DateTime.Now:yyyyMMddHHmm}</h2>
                </div>
                <div class='info-cliente'>
                    <p><strong>Fecha:</strong> {DateTime.Now:dd/MM/yyyy HH:mm}</p>
                    <p><strong>Cliente:</strong> {nombre}</p>
                    <p><strong>Correo:</strong> {correo}</p>
                </div>
                <div class='detalle-factura'>
                    <table>
                        <thead>
                            <tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr>
                        </thead>
                        <tbody>
                            {productos}
                        </tbody>
                        <tfoot>
                            <tr><td colspan='3' class='total'>TOTAL</td><td class='total'>${total}</td></tr>
                        </tfoot>
                    </table>
                </div>
                <div class='footer'>
                    <p>Gracias por su compra en Nexus Construction</p>
                    <p>contacto@nexusconstruction.com</p>
                </div>
            </div>
            <script>
                function generarPDF() {{ window.print(); }}
                document.addEventListener('DOMContentLoaded', function() {{
                    var btn = document.createElement('a');
                    btn.href = '#';
                    btn.textContent = 'Descargar PDF';
                    btn.className = 'download-btn';
                    btn.onclick = generarPDF;
                    document.querySelector('.footer').appendChild(btn);
                }});
            </script>
        </body>
        </html>";

        var emailService = request.HttpContext.RequestServices.GetRequiredService<EmailService>();
        await emailService.EnviarFacturaAsync(
            correo,
            $"Factura Nexus Construction #{DateTime.Now:yyyyMMddHHmm}",
            facturaHtml
        );

        return Results.Content(facturaHtml, "text/html");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error al procesar el pago: {ex.Message}");
    }
});

app.Run();
