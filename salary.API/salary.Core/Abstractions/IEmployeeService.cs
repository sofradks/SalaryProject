using salary.Core.Models;

namespace salary.Application.Services
{
    public interface IEmployeeService
    {
        Task<Guid> CreateEmployee(Employee employee);
        Task<Guid> DeleteEmployee(Guid id);
        Task<List<Employee>> GetAllEmployees();
        Task<Guid> UpdateEmployee(Guid id, string surname, string name, string patronymic, string snils, string pSeria, string pNumber, decimal rate, DateTime dateOfReceipt, DateTime dateOfDismissal, Guid position, List<Guid> privileges);
    }
}