using salary.Core.Models;

namespace salary.DataAccess.Repository
{
    public interface IEmployeeRepository
    {
        Task<Guid> Create(Employee employee);
        Task<Guid> Delete(Guid id);
        Task<List<Employee>> Get();
        Task<Guid> Update(Guid id, string surname, string name, string patronymic, string snils, string pSeria, string pNumber, decimal rate, DateTime dateOfReceipt, DateTime dateOfDismissal, Guid position, List<Guid> privileges);
    }
}