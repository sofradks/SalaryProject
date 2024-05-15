using Microsoft.AspNetCore.Mvc;
using salary.API.Contracts;
using salary.Application.Services;
using salary.Core.Models;

namespace salary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        //private readonly HttpContext _context;

        public UserController(IUserService userService)
        {
            _userService = userService;
            //_context = context;
        }

        [HttpPost]
        public async Task<ActionResult<string>> GetUserToken([FromBody] UserRequest request)
        {
            var user = new User(
                Guid.NewGuid(),
                request.Login,
                request.Password);
            var token = await _userService.Login(user);

            HttpContext.Response.Cookies.Append("cookie", token);

            var tok = new Tok();
            tok.Token = token;
            tok.Id = 1;

            return Ok(tok);
        }

        [HttpPost("reg")]
        public async Task<ActionResult<Guid>> Register([FromBody] RegisterRequest request)
        {
            var user = new User(
                Guid.NewGuid(),
                request.Login,
                request.Password);

            var token = await _userService.Login(user);

            HttpContext.Response.Cookies.Append("cookie", token);

            return Ok("token " + token);
        }

    }

    public class Tok
    {
        public int Id { get; set; }
        public string Token { get; set; }
    }
}