using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;


public class ResizeImage{

    public static WebImage resize(HttpPostedFileBase img){
        WebImage w = new WebImage(img.InputStream);
        w.Resize(160, 160);
        return w;
    }
}
