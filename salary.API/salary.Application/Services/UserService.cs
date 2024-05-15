using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using salary.Core.Models;
using salary.DataAccess.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace salary.Application.Services
{
    public class UserService : IUserService
    {

        private readonly IUsersRepository _userRepository;
        private readonly string secretKey = "zhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendos";
        private readonly int ExpiresHours = 12;
        public UserService(IUsersRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public string Generate(string password) =>
            BCrypt.Net.BCrypt.EnhancedHashPassword(password);

        public bool Verify(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, passwordHash);
        }


        public string GenerateToken(User user)
        {
            //Claim[] claims = new Claim(new("userId", user.ID.ToString());

            var singningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256
                );

            var token = new JwtSecurityToken(
                //claims: claims,
                signingCredentials: singningCredentials
                );
            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

        public async Task<Guid> Register(User user)
        {
            user.Password = Generate(user.Password);

            return await _userRepository.Create(user);
        }

        public async Task<string> Login(User userLogin)
        {
            var userPassword = await _userRepository.Get(userLogin.Login);

            var result = Verify(userLogin.Password, userPassword);
            if (result == false)
            {
                throw new Exception("Неверный пароль");
            }
            var token = GenerateToken(userLogin);

            return token;
        }

    }

}
