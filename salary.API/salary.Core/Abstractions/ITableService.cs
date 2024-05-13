using salary.Core.Models;

namespace salary.Application.Services
{
    public interface ITableService
    {
        Task<Guid> CreateTable(Table table);
        Task<Guid> DeleteTable(Guid id);
        Task<List<Table>> GetAllTables();
        Task<Guid> UpdateTable(Guid id, Guid employeeGuid, decimal year, decimal month, decimal day, string status);
    }
}