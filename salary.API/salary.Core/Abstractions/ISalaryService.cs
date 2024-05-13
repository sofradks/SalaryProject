using salary.Core.Models;

namespace salary.Application.Services
{
    public interface ISalaryService
    {
        Task<Guid> CreateSalary(Salary salary);
        Task<Guid> DeleteSalary(Guid id);
        Task<List<Salary>> GetAllSalary();
        Task<Guid> UpdateSalary(Guid id, Guid employeeGuid, decimal year, decimal month, decimal hours, decimal summ);
    }
}