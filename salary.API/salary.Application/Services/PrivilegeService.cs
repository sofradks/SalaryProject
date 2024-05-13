using salary.Core.Models;
using salary.DataAccess.Repository;
using System.Collections.Generic;

namespace salary.Application.Services
{
    public class PrivilegeService : IPrivilegeService
    {

        private readonly IPrivilegesRepository _privilegesRepository;
        public PrivilegeService(IPrivilegesRepository privilegesRepository)
        {
            _privilegesRepository = privilegesRepository;
        }

        public async Task<List<Privilege>> GetAllPrivileges()
        {
            return await _privilegesRepository.Get();
        }

        public async Task<Guid> CreatePrivilege(Privilege privilege)
        {
            return await _privilegesRepository.Create(privilege);
        }

        public async Task<Guid> UpdatePrivilege(Guid id, string name, decimal allowance)
        {
            return await _privilegesRepository.Update(id, name, allowance);
        }

        public async Task<Guid> DeletePrivilege(Guid id)
        {
            return await _privilegesRepository.Delete(id);
        }
    }
}
