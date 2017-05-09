﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class EncodingParams{
    public static string encode(string encodeMe){
        byte[] encoded = System.Text.Encoding.UTF8.GetBytes(encodeMe);
        return Convert.ToBase64String(encoded);
    }

    public static string decode(string decodeMe){
        byte[] encoded = Convert.FromBase64String(decodeMe);
        return System.Text.Encoding.UTF8.GetString(encoded);
    }
}
