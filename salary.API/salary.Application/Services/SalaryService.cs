using salary.Core.Models;
using salary.DataAccess.Repository;

namespace salary.Application.Services
{
    public class SalaryService : ISalaryService
    {

        private readonly ISalaryRepository _salaryRepository;
        public SalaryService(ISalaryRepository salaryRepository)
        {
            _salaryRepository = salaryRepository;
        }

        public async Task<List<Salary>> GetAllSalary()
        {
            return await _salaryRepository.Get();
        }

        public async Task<Guid> CreateSalary(Salary salary)
        {
            return await _salaryRepository.Create(salary);
        }

        public async Task<Guid> UpdateSalary(Guid id, Guid employeeGuid, decimal year, decimal month, decimal hours, decimal summ)
        {
            return await _salaryRepository.Update(id, employeeGuid, year, month, hours, summ);
        }

        public async Task<Guid> DeleteSalary(Guid id)
        {
            return await _salaryRepository.Delete(id);
        }
    }
}
