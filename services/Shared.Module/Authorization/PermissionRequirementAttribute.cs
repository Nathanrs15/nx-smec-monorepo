using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Shared.Module.Models;
using System;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Module.Authorization
{
    public class PermissionRequirementAttribute : TypeFilterAttribute
    {

        public PermissionRequirementAttribute(string type ,string permission) : base(typeof(PermissionFilter))
        {
            Arguments = new object[] { new Claim(type, permission) };
        }

    }
    public class PermissionFilter : IAuthorizationFilter
    {

        readonly Claim _claim;

        public PermissionFilter(Claim claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var accessToken = context.HttpContext.Request.Headers[HeaderNames.Authorization][0];


            var model = new AuthModel() { Token = accessToken, Type = _claim.Type, RequirementPermission = _claim.Value };
            var IsUserAuthorized = CheckUserAuth(model).Result;

            if (!IsUserAuthorized) context.Result = new UnauthorizedResult();

        }

        public static async Task<bool> CheckUserAuth(AuthModel auth)
        {
            var client = new HttpClient();
            
            HttpResponseMessage response = await client.PostAsync("http://localhost:5004/api/authorization", new StringContent(JsonConvert.SerializeObject(auth), Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
            
            var result = await response.Content.ReadAsStringAsync();
            var jsonResult = JsonConvert.DeserializeObject<AuthResponse>(result);

            return await Task.FromResult(jsonResult.IsUserAuthorized);
        }
    }
}
