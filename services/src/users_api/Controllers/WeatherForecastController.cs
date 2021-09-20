using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

using Shared.Module.Constants;
using Shared.Module.Authorization;

using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Shared.Module.Models;

namespace users_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };



        public WeatherForecastController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [PermissionRequirement("Weather", Permissions.View)]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }


        [HttpGet("test")]
        [PermissionRequirement("Weather", Permissions.View)]
        public async Task<IActionResult> Test()
        {

            var currentUser = await _userManager.GetUserAsync(HttpContext.User);

            var result = new { Permission = "Authorized access", User = currentUser };
            return new ObjectResult(result);
        }

    }


}
