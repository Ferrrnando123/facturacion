var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<InventarioService>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
