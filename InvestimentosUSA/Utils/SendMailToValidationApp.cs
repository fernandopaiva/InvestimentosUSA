using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Diagnostics;

//valida email do app
public class SendMailToValidationApp{
    //String server = HttpContext.Current.Request.Url.Host;
    private static String absoluteURL = "http://" + HttpContext.Current.Request.Url.Authority + "/Usuario/validaEmailApp?email=";
    
    public static Boolean isSend(String email){        
        try{
            MailMessage mail = new MailMessage();
            mail.To.Add(email);
            mail.From = new MailAddress(CustomEmail.EMAIL_AUTH);
            mail.Subject = "Validação de email do aplicativo MeuPedido";
            string url = absoluteURL + HttpUtility.UrlEncode(email);
            mail.Body = "<html><body><h3>Bem-vindo ao aplicativo MeuPedido Delivery<h3><br>Ative agora sua conta para ter acesso ao aplicativo<br/><a href=\"" + url + "\">Ativar</a></body></html>";
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
            Debug.WriteLine(e.StackTrace);
            return false;
        }        
    }

}
