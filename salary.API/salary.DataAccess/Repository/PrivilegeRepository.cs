using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using salary.Core.Models;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Repository
{
    public class PrivilegesRepository : IPrivilegesRepository
    {
        private readonly salaryDbContext _context;
        public PrivilegesRepository(salaryDbContext context)
        {
            _context = context;
        }

        public async Task<List<Privilege>> Get()
        {
            var privilegeEntities = await _context.privileges.AsNoTracking().ToListAsync();

            var privileges = privilegeEntities.Select(p => new Privilege(p.id, p.name, p.allowance))
                .ToList();
            return privileges;
        }

        public async Task<List<Privilege>> GetOne(Guid id)
        {
            var privilegeEntity = await _context.privileges.Where(p => p.id == id).AsNoTracking().ToListAsync();

            var privilege = privilegeEntity.Select(p => new Privilege(p.id, p.name, p.allowance))
                .ToList();
            return privilege;
        }
        public async Task<Guid> Create(Privilege privilege)
        {
            var privilegeEntity = new PrivilegeEntity
            {
                id = privilege.ID,
                name = privilege.Name,
                allowance = privilege.Allowance
            };
            await _context.privileges.AddAsync(privilegeEntity);
            await _context.SaveChangesAsync();

            return privilegeEntity.id;
        }

        public async Task<Guid> Update(Guid id, string name, decimal allowance)
        {
            await _context.privileges.Where(p => p.id == id).ExecuteUpdateAsync(s => s
                .SetProperty(p => p.name, p => name)
                .SetProperty(p => p.allowance, p => allowance));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.privileges
                .Where(p => p.id == id).ExecuteDeleteAsync();
            return id;
        }
    }
}
