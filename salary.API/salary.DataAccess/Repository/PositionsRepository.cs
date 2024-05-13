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
    public class PositionsRepository : IPositionsRepository
    {
        private readonly salaryDbContext _context;
        public PositionsRepository(salaryDbContext context)
        {
            _context = context;
        }

        public async Task<List<Position>> Get()
        {
            var positionEntities = await _context.positions.AsNoTracking().ToListAsync();

            var positions = positionEntities.Select(p => Position.Create(p.id, p.name, p.hours, p.salary).Position)
                .ToList();
            return positions;
        }
        public async Task<Guid> Create(Position position)
        {
            var positonEntity = new PositionEntity
            {
                id = position.ID,
                name = position.Name,
                hours = position.Hours,
                salary = position.Salary
            };
            await _context.positions.AddAsync(positonEntity);
            await _context.SaveChangesAsync();

            return positonEntity.id;
        }

        public async Task<Guid> Update(Guid id, string name, decimal hours, decimal salary)
        {
            await _context.positions.Where(p => p.id == id).ExecuteUpdateAsync(s => s
                .SetProperty(p => p.name, p => name)
                .SetProperty(p => p.hours, p => hours)
                .SetProperty(p => p.salary, p => salary));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.positions
                .Where(p => p.id == id).ExecuteDeleteAsync();
            return id;
        }
    }
}
