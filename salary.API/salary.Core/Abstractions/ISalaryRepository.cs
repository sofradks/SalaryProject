using salary.Core.Models;

namespace salary.DataAccess.Repository
{
    public interface ISalaryRepository
    {
        Task<Guid> Create(Salary salary);
        Task<Guid> Delete(Guid id);
        Task<List<Salary>> Get();
        Task<Guid> Update(Guid id, Guid employeeGuid, decimal year, decimal month, decimal hours, decimal summ);
    }
}