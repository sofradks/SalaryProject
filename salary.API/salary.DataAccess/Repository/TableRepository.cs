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
    public class TableRepository : ITableRepository
    {
        private readonly salaryDbContext _context;
        public TableRepository(salaryDbContext context)
        {
            _context = context;
        }

        public async Task<List<Table>> Get()
        {
            var tableEntities = await _context.table.AsNoTracking().ToListAsync();

            var tables = tableEntities.Select(p => new Table(p.id, p.employee, p.year, p.month, p.day, p.status))
                .ToList();
            foreach (var table in tables)
            {
                var employee = _context.employees.Where(p => p.id == table.EmployeeGuid).Select(p => $"{p.surname} {p.name} {p.patronymic}").SingleOrDefault();
                table.EmployeeString = employee;
            }

            return tables;
        }

        public async Task<Guid> Create(Table table)
        {
            var tableEntity = new TableEntity
            {
                id = table.ID,
                employee = table.EmployeeGuid,
                year = table.Year,
                month = table.Month,
                day = table.Day,
                status = table.Status
            };
            await _context.table.AddAsync(tableEntity);
            await _context.SaveChangesAsync();

            return tableEntity.id;
        }

        public async Task<Guid> Update(Guid id, Guid employeeGuid, decimal year, decimal month, decimal day, string status)
        {
            await _context.table.Where(p => p.id == id).ExecuteUpdateAsync(s => s
                .SetProperty(p => p.employee, p => employeeGuid)
                .SetProperty(p => p.year, p => year)
                .SetProperty(p => p.month, p => month)
                .SetProperty(p => p.day, p => day)
                .SetProperty(p => p.status, p => status));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.table
                .Where(p => p.id == id).ExecuteDeleteAsync();
            return id;
        }
    }
}
