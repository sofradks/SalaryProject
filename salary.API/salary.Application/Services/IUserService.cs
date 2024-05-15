using salary.Core.Models;

namespace salary.Application.Services
{
    public interface IUserService
    {
        string Generate(string password);
        Task<string> Login(User userLogin);
        Task<Guid> Register(User user);
        bool Verify(string password, string passwordHash);
    }
}