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
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly salaryDbContext _context;
        public EmployeeRepository(salaryDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> Get()
        {
            var employeeEntities = await _context.employees.AsNoTracking().ToListAsync();

            var employees = employeeEntities.Select(p => new Employee(p.id, p.surname, p.name, p.patronymic,
            p.snils, p.pSeria, p.pNumber, p.rate, p.dateOfReceipt, p.dateOfDismissal, p.position, p.privileges)).ToList();
            foreach (var employee in employees)
            {
                foreach (var guid in employee.PrivilegesGuid)
                {
                    var privilege = string.Empty;
                    privilege = _context.privileges.Where(p => p.id == guid).Select(p => p.name).SingleOrDefault();
                    if (privilege == string.Empty)
                    {
                        continue;
                    }
                    employee.PrivilegesString.Add(privilege);
                }
                var position = _context.positions.Where(p => p.id == employee.PositionGuid).Select(p => p.name).SingleOrDefault();
                employee.PositionString = position;
            }
            return employees;
        }
        public async Task<Guid> Create(Employee employee)
        {
            var employeeEntity = new EmployeeEntity
            {
                id = employee.ID,
                surname = employee.Surname,
                name = employee.Name,
                patronymic = employee.Patronymic,
                snils = employee.Snils,
                pSeria = employee.PSeria,
                pNumber = employee.PNumber,
                rate = employee.Rate,
                dateOfReceipt = employee.DateOfReceipt,
                dateOfDismissal = employee.DateOfDismissal,
                position = employee.PositionGuid,
                privileges = employee.PrivilegesGuid
            };
            await _context.employees.AddAsync(employeeEntity);
            await _context.SaveChangesAsync();

            return employeeEntity.id;
        }

        public async Task<Guid> Update(Guid id, string surname, string name, string patronymic, string snils,
            string pSeria, string pNumber, decimal rate, DateTime dateOfReceipt,
            DateTime dateOfDismissal, Guid position, List<Guid> privileges)
        {
            await _context.employees.Where(p => p.id == id).ExecuteUpdateAsync(s => s
                .SetProperty(p => p.surname, p => surname)
                .SetProperty(p => p.name, p => name)
                .SetProperty(p => p.patronymic, p => patronymic)
                .SetProperty(p => p.snils, p => snils)
                .SetProperty(p => p.pSeria, p => pSeria)
                .SetProperty(p => p.pNumber, p => pNumber)
                .SetProperty(p => p.rate, p => rate)
                .SetProperty(p => p.dateOfReceipt, p => dateOfReceipt)
                .SetProperty(p => p.dateOfDismissal, p => dateOfDismissal)
                .SetProperty(p => p.position, p => position)
                .SetProperty(p => p.privileges, p => privileges)
                );
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.employees
                .Where(p => p.id == id).ExecuteDeleteAsync();
            return id;
        }
    }
}
