using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Security.Claims;
using webapi.Authentication.Service;

namespace webapi.Authentication.Controller
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("admins")]
        [Authorize(Roles = "admin")]
        public IActionResult AdminEndPoint()
        {
            UserModel? currentUser = GetCurrentUser();
            return Ok($"Ji, you are an {currentUser?.Role}");
        }

        private UserModel? GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new UserModel
                {
                    Username = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                    Role = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value
                };
            }
            return null;
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<UserModel>>> GetAll() 
        {
            var result = await _userService.GetAsync();
            return CreatedAtAction(nameof(GetAll), result);
        }

        [HttpPost("register")]
        [Consumes(MediaTypeNames.Application.Json)]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] UserModel newUser)
        {
            var users = await _userService.GetAsync();

            foreach (var user in users)
            {
                if (user.Email!.Equals(newUser.Email, StringComparison.InvariantCultureIgnoreCase))
                {
                    return BadRequest("User could not be created because the givven e-mail{" + newUser.Email + "} is already in use.");
                }
                else if(user.Username!.Equals(newUser.Username, StringComparison.InvariantCultureIgnoreCase))
                {
                    return BadRequest("User could not be created because the givven username{" + newUser.Username + "} is already in use.");
                }
            }

            await _userService.CreateAsync(newUser);

            return Ok("User successfully created");
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Delete([FromRoute] String id)
        {
            await _userService.RemoveAsync(id);
            return Ok("User successfully deleted");
        }
    }
}
