using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class EmailService
{
    public async Task EnviarFacturaAsync(string email, string asunto, string contenido)
    {
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("tucorreo@gmail.com", "tupassword"), // reemplaza
            EnableSsl = true,
        };

        var mensaje = new MailMessage
        {
            From = new MailAddress("tucorreo@gmail.com"), // reemplaza
            Subject = asunto,
            Body = contenido,
            IsBodyHtml = true,
        };
        mensaje.To.Add(email);

        await smtpClient.SendMailAsync(mensaje);
    }
}
