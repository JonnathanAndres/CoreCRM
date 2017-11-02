using System;

namespace CoreCRM.Extensions.Abstractions
{
    public class MenuItem
    {
        public string Name { get; set; }
        public string Route { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
    }
}