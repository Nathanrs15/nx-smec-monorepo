
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Linq;
using Shared.Module.Models;
using Authorization;

namespace IdentityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ApplicationDbContext _context;


        public AuthenticationController(
                        SignInManager<ApplicationUser> signInManager,
                        IConfiguration configuration,
                        UserManager<ApplicationUser> userManager,
                        RoleManager<ApplicationRole> roleManager,
                        ApplicationDbContext context

            )
        {
            _signInManager = signInManager;
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(TokenRequestModel model)
        {
            if (model == null)
            {
                return new StatusCodeResult(500);
            }

            if (model.grant_type == "password")
            {
                return await GetToken(model).ConfigureAwait(false);
            }
            else
            {
                return new UnauthorizedResult();
            }

        }

        private async Task<List<Claim>> GetvalidClaims(ApplicationUser user)
        {
            DateTime now = DateTime.UtcNow;
            IdentityOptions _options = new IdentityOptions();

            var claims = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString()),
                    //new Claim(_options.ClaimsIdentity.UserIdClaimType, user.Id.ToString()),
                    //new Claim(_options.ClaimsIdentity.UserNameClaimType, user.UserName)
                };

            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);

            List<string> filteredPermissions = new List<string>();

            claims.AddRange(userClaims);
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("roles", userRole));
                var role = await _roleManager.FindByNameAsync(userRole);
                if (role != null)
                {
                    var roleClaims = _context.RolePermissions.Where(x => x.RoleId == role.Id).ToList();

                    var roleClaimsValues = roleClaims.Select(x => x.PermissionId);

                    foreach (var roleClaim in roleClaimsValues)
                    {
                        // claims.Add(new Claim("permissions", roleClaim.Key));
                        var permission = _context.Permissions.FirstOrDefault(x => x.Id == roleClaim);
                        filteredPermissions.Add(permission.Value);
                    }
                }
            }

            var groupRoleClaims = filteredPermissions.GroupBy(x => x).Select(x => x.First());

            claims.AddRange(groupRoleClaims.Select(x => new Claim("permissions", x)));

            return claims;
        }
        private async Task<IActionResult> GetToken(TokenRequestModel model)
        {
            try
            {
                // check if there's an user with the given username
                var user = await _signInManager.UserManager.FindByEmailAsync(model.email);
                var claims = await GetvalidClaims(user).ConfigureAwait(false);
                // fallback to support e-mail address instead of username

                //if (user == null && model.username.Contains("@"))
                //{
                //    user = await _signInManager.UserManager.FindByEmailAsync(model.username);
                //}
                if (user == null || !await _signInManager.UserManager.CheckPasswordAsync(user, model.password))
                {
                    return new UnauthorizedResult();
                }
                var tokenExpirationMins = _configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                var issuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"]));
                DateTime now = DateTime.UtcNow;
                var token = new JwtSecurityToken(
                    issuer: _configuration["Auth:Jwt:Issuer"],
                    audience: _configuration["Auth:Jwt:Audience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                    signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256)
                );

                var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                // build & return the response
                var response = new TokenResponseModel
                {
                    token = encodedToken,
                    expiration = tokenExpirationMins
                };
                return new ObjectResult(response);
            }
            catch (Exception)
            {

                return new UnauthorizedResult();
            }
        }


    }

    [JsonObject(MemberSerialization.OptOut)]
    public class TokenResponseModel
    {
        public string token { get; set; }
        public int expiration { get; set; }
    }

    [JsonObject(MemberSerialization.OptOut)]
    public class TokenRequestModel
    {
        public string grant_type { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }
    }


    //public class CustomLoginInputModel
    //{
    //    [Required]
    //    [EmailAddress]
    //    public string Email { get; set; }

    //    [Required]
    //    [DataType(DataType.Password)]
    //    public string Password { get; set; }

    //    [Display(Name = "Remember me")]
    //    public bool RememberMe { get; set; }
    //}


}