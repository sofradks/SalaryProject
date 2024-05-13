using salary.Core.Models;

namespace salary.Application.Services
{
    public interface IPrivilegeService
    {
        Task<Guid> CreatePrivilege(Privilege privilege);
        Task<Guid> DeletePrivilege(Guid id);
        Task<List<Privilege>> GetAllPrivileges();
        Task<Guid> UpdatePrivilege(Guid id, string name, decimal allowance);
    }
}