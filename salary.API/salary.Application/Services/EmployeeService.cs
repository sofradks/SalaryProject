using salary.Core.Models;
using salary.DataAccess.Repository;

namespace salary.Application.Services
{
    public class EmployeeService : IEmployeeService
    {

        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _employeeRepository.Get();
        }

        public async Task<Guid> CreateEmployee(Employee employee)
        {
            return await _employeeRepository.Create(employee);
        }

        public async Task<Guid> UpdateEmployee(Guid id, string surname, string name, string patronymic, string snils,
            string pSeria, string pNumber, decimal rate, DateTime dateOfReceipt,
            DateTime dateOfDismissal, Guid position, List<Guid> privileges)
        {
            return await _employeeRepository.Update(id, surname, name, patronymic, snils,
             pSeria, pNumber, rate, dateOfReceipt,
             dateOfDismissal, position, privileges);
        }

        public async Task<Guid> DeleteEmployee(Guid id)
        {
            return await _employeeRepository.Delete(id);
        }
    }
}
