using salary.Core.Models;

namespace salary.DataAccess.Repository
{
    public interface ITableRepository
    {
        Task<Guid> Create(Table table);
        Task<Guid> Delete(Guid id);
        Task<List<Table>> Get();
        Task<Guid> Update(Guid id, Guid employeeGuid, decimal year, decimal month, decimal day, string status);
    }
}