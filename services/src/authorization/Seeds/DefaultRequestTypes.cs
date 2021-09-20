using Shared.Module.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Seeds
{
    public class DefaultRequestTypes
    {
        public static IEnumerable<RequestType> RequestTypes =>
             new RequestType[]
             {
                new RequestType { Id = 1, Name = "View", Method = "GET"},
                new RequestType { Id = 2, Name = "Create", Method = "POST"},
                new RequestType { Id = 3, Name = "Edit", Method = "PUT"},
                new RequestType { Id = 4, Name = "Delete", Method = "DELETE"},
             };
    }
}
