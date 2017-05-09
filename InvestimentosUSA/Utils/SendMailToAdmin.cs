using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;



public class SendMailToAdmin{
    private Dictionary<String, String> jsonResposta = new Dictionary<string, string>();

    public static Boolean send(String email, String assunto, String mensagem){
        try{
            MailMessage mail = new MailMessage();
            mail.To.Add(CustomEmail.EMAIL_AUTH);
            mail.From = new MailAddress(email);
            mail.ReplyToList.Add(email);
            mail.Subject = "MeuPedido, " + assunto;                
            mail.Body = "<html><body><p>" + mensagem + "</p></body></html>";
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = CustomEmail.EMAIL_SMTP_HOST;
            smtp.Port = CustomEmail.EMAIL_SMTP_PORT;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential(CustomEmail.EMAIL_AUTH, CustomEmail.EMAIL_AUTH_PASSWORD);// Enter seders User name and password
            smtp.EnableSsl = true;
            smtp.Timeout = 20000;
            smtp.Send(mail);
            return true;
        }catch (SmtpException e){
            Console.WriteLine(e.StackTrace);
            return false;
        }
    }
}
