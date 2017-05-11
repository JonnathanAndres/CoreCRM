using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM
{
    public static class Utils
    {
        public static DateTime GetNextEndOfWeek()
        {
            var today = DateTime.Now.Date;
            var endOfWeek = new DateTime(today.Year, today.Month, today.Day, 23, 59, 59);
            return endOfWeek.AddDays(7 - (int)today.DayOfWeek);
        }
    }
}
