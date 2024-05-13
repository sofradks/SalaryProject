using Microsoft.EntityFrameworkCore;
using salary.Core.Models;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Repository
{
    public class SalaryRepository : ISalaryRepository
    {
        private readonly salaryDbContext _context;
        public SalaryRepository(salaryDbContext context)
        {
            _context = context;
        }

        public async Task<List<Salary>> Get()
        {
            var salaryEntities = await _context.salary.AsNoTracking().ToListAsync();

            var salaries = salaryEntities.Select(p => new Salary(p.id, p.employee, p.year, p.month, p.hours, p.summ))
                .ToList();

            foreach (var salary in salaries)
            {
                var employee = _context.employees.Where(p => p.id == salary.EmployeeGuid).Select(p => new Employee(p.id, p.surname, p.name, p.patronymic,
                p.snils, p.pSeria, p.pNumber, p.rate, p.dateOfReceipt, p.dateOfDismissal, p.position, p.privileges)).SingleOrDefault();
                salary.EmployeeString = $"{employee.Surname} {employee.Name} {employee.Patronymic}";

                if (salary.Hours == 0)
                {
                    var tableAppearCount = _context.table.Where(p => p.employee == salary.EmployeeGuid && p.year == salary.Year && p.month == salary.Month &&
                        p.status.ToLower() != "н" && p.status.ToLower() != "в").Select(p => p.id).Count();
                    salary.Hours = tableAppearCount * 8;
                }

                if (salary.Summ == 0)
                {
                    var position = _context.positions.Where(p => p.id == employee.PositionGuid).Select(p => Position.Create(p.id, p.name, p.hours,
                    p.salary).Position).SingleOrDefault();
                    var positionHours = position.Hours;
                    var positionSalary = position.Salary;

                    decimal privilegeSum = 0;
                    foreach (var privilegeGuid in employee.PrivilegesGuid)
                    {
                        var prvilegeCost = _context.privileges.Where(p => p.id == privilegeGuid).Select(p => p.allowance).SingleOrDefault();
                        privilegeSum += prvilegeCost;
                    }

                    var sum = employee.Rate * (positionSalary * (salary.Hours / positionHours)) + privilegeSum;
                    salary.Summ = sum;
                }

            }
            return salaries;
        }

        public async Task<Guid> Create(Salary salary)
        {
            var salaryeEntity = new SalaryEntity
            {
                id = salary.ID,
                employee = salary.EmployeeGuid,
                year = salary.Year,
                month = salary.Month,
                hours = salary.Hours,
                summ = salary.Summ

            };
            await _context.salary.AddAsync(salaryeEntity);
            await _context.SaveChangesAsync();

            return salaryeEntity.id;
        }

        public async Task<Guid> Update(Guid id, Guid employeeGuid, decimal year, decimal month, decimal hours, decimal summ)
        {
            await _context.salary.Where(p => p.id == id).ExecuteUpdateAsync(s => s
                .SetProperty(p => p.employee, p => employeeGuid)
                .SetProperty(p => p.year, p => year)
                .SetProperty(p => p.month, p => month)
                .SetProperty(p => p.hours, p => hours)
                .SetProperty(p => p.summ, p => summ));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.salary
                .Where(p => p.id == id).ExecuteDeleteAsync();
            return id;
        }
    }
}
