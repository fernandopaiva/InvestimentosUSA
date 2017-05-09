using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public static class EnumerableEmpty{

    public static bool IsAny<T>(this IEnumerable<T> data){
        return data != null && data.Any();
    }
}
