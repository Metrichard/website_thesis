using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Authentication.Model;
using webapi.Authentication.Service;
using BCrypt.Net;

namespace webapi.Authentication.Controller
{
    [Route("api")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;

        public LogInController(IConfiguration configuration, UserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("/login")]
        public ActionResult Login([FromBody] UserLogin userLogin)
        {
            UserModel? user = Authenticate(userLogin).Result;
            if (user != null && user.Username != null && user.DisplayName != null && user.Email != null)
            {
                string token = GenerateToken(user);
                UserLoginResponse userLoginResponse = new UserLoginResponse() 
                {
                    Username = user.Username,
                    DisplayName = user.DisplayName,
                    Email = user.Email,
                    jwtToken = token
                };
                return Ok(userLoginResponse);
            }

            return NotFound("user not found");
        }

        private string GenerateToken(UserModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"], 
                _configuration["Jwt:Audiance"], 
                claims, expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<UserModel?> Authenticate(UserLogin userLogin)
        {
            UserModel currentUser = await _userService.GetAsync(userLogin.Username);
            if(currentUser != null && currentUser.Password != null)
            {
                bool result = BCrypt.Net.BCrypt.Verify(userLogin.Password, currentUser.Password);
                if (result)
                {
                    return currentUser;
                }
                return null;
            }
            return null;
        }
    }
}
