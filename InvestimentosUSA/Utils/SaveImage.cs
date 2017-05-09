using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Diagnostics;
using System.IO;
using System.Web.Helpers;




public class SaveImage{

    public static void save(HttpPostedFileBase image, String pathFile, String imgName){        
        String extension = Path.GetExtension(image.FileName);
        String pathToSave = HttpContext.Current.Server.MapPath(pathFile);
        WebImage wi = new WebImage(image.InputStream);        
        wi.Resize(width:200, height:200, preserveAspectRatio:false, preventEnlarge:false);
        String imgToSave = Path.Combine(pathToSave, imgName + extension);
        wi.Save(imgToSave);
    }

}
