using Microsoft.EntityFrameworkCore;
using salary.Core.Models;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly salaryDbContext _context;
        public UsersRepository(salaryDbContext context)
        {
            _context = context;
        }

        public async Task<string> Get(string login)
        {
            var userEntity = await _context.users.AsNoTracking().FirstOrDefaultAsync(u => u.login == login) ?? throw new Exception();

            var userPassword = userEntity.password;
            return userPassword;
        }
        public async Task<Guid> Create(User user)
        {
            var userEntity = new UserEntity
            {
                id = user.ID,
                login = user.Login,
                password = user.Password
            };
            await _context.users.AddAsync(userEntity);
            await _context.SaveChangesAsync();

            return userEntity.id;
        }

        //public async Task<Guid> Update(Guid id, string name, decimal hours, decimal salary)
        //{
        //    await _context.positions.Where(p => p.id == id).ExecuteUpdateAsync(s => s
        //        .SetProperty(p => p.name, p => name)
        //        .SetProperty(p => p.hours, p => hours)
        //        .SetProperty(p => p.salary, p => salary));
        //    return id;
        //}

        //public async Task<Guid> Delete(Guid id)
        //{
        //    await _context.positions
        //        .Where(p => p.id == id).ExecuteDeleteAsync();
        //    return id;
        //}
    }
}
