using salary.Core.Models;

namespace salary.DataAccess.Repository
{
    public interface IUsersRepository
    {
        Task<Guid> Create(User user);
        Task<string> Get(string login);
    }
}