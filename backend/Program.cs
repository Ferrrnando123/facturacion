var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapPost("/procesar-pago", async (HttpRequest request) => 
{
    var form = await request.ReadFormAsync();
    var nombre = form["Nombre"].ToString();
    var correo = form["Correo"].ToString();
    var productos = form["Productos"].ToString();
    var total = form["Total"].ToString();

    // Generar HTML con diseño profesional
    var facturaHtml = $@"
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Factura Nexus Construction</title>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; color: #333; }}
            .factura-container {{ max-width: 800px; margin: 0 auto; border: 1px solid #e1e1e1; box-shadow: 0 0 10px rgba(0,0,0,0.1); }}
            .header {{ background: #2c3e50; color: white; padding: 20px; text-align: center; }}
            .logo {{ font-size: 24px; font-weight: bold; color: #f39c12; }}
            .info-cliente {{ padding: 20px; background: #f8f9fa; }}
            .detalle-factura {{ padding: 20px; }}
            table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
            th {{ background: #f39c12; color: white; padding: 10px; text-align: left; }}
            td {{ padding: 10px; border-bottom: 1px solid #ddd; }}
            .total {{ font-weight: bold; font-size: 18px; }}
            .footer {{ text-align: center; padding: 20px; font-size: 12px; color: #7f8c8d; }}
            .download-btn {{ 
                display: block; 
                width: 200px; 
                margin: 20px auto; 
                padding: 10px; 
                background: #27ae60; 
                color: white; 
                text-align: center; 
                text-decoration: none; 
                border-radius: 5px;
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
                <p><strong>Fecha:</strong> {DateTime.Now.ToString("dd/MM/yyyy HH:mm")}</p>
                <p><strong>Cliente:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {correo}</p>
            </div>
            
            <div class='detalle-factura'>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>P. Unitario</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos}
                    </tbody>
                    <tfoot>
                        <tr class='total'>
                            <td colspan='3'>TOTAL</td>
                            <td>${total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class='footer'>
                <p>¡Gracias por su compra en Nexus Construction!</p>
                <p>Para cualquier consulta, contacte a: contacto@nexusconstruction.com</p>
            </div>
        </div>
        
        <script>
            // Función para generar PDF
            function generarPDF() {{
                window.print();
            }}
            
            // Botón de descarga visible
            document.addEventListener('DOMContentLoaded', function() {{
                const btn = document.createElement('a');
                btn.href = '#';
                btn.className = 'download-btn';
                btn.textContent = 'Descargar PDF';
                btn.onclick = generarPDF;
                document.querySelector('.footer').appendChild(btn);
            }});
        </script>
    </body>
    </html>
    ";

    return Results.Content(facturaHtml, "text/html");
});

app.Run();