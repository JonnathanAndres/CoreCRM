using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM.Areas.Api.Constants
{
    public enum ReturnCode
    {
        OK = 0,

        LOGIN_FAILED = 1000,
        LOGIN_FAILED_USER_NOT_EXISTS = 1001,
        LOGIN_FAILED_USER_LOCKEDOUT = 1002,
    }
}
