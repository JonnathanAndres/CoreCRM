using System.Collections.Generic;

namespace CoreCRM.Extensions.Abstractions
{
    public interface IMenuExtension
    {
        IEnumerator<MenuItem> GetMenu();
    }
}