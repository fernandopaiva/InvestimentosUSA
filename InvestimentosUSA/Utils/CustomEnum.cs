using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

//essa classe eh usada para dropdownlist de enum
public class CustomEnum{

    public static class Enum{
        public static IEnumerable<T> GetItems<T>(){
            return System.Enum.GetValues(typeof(T)).Cast<T>();
        }
    }

}
