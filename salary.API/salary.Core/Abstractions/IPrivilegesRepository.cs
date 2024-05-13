using salary.Core.Models;

namespace salary.DataAccess.Repository
{
    public interface IPrivilegesRepository
    {
        Task<Guid> Create(Privilege privilege);
        Task<Guid> Delete(Guid id);
        Task<List<Privilege>> Get();
        Task<List<Privilege>> GetOne(Guid id);
        Task<Guid> Update(Guid id, string name, decimal allowance);
    }
}