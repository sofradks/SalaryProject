using salary.Core.Models;
using salary.DataAccess.Repository;

namespace salary.Application.Services
{
    public class TableService : ITableService
    {

        private readonly ITableRepository _TableRepository;
        public TableService(ITableRepository tableRepository)
        {
            _TableRepository = tableRepository;
        }

        public async Task<List<Table>> GetAllTables()
        {
            return await _TableRepository.Get();
        }

        public async Task<Guid> CreateTable(Table table)
        {
            return await _TableRepository.Create(table);
        }

        public async Task<Guid> UpdateTable(Guid id, Guid employeeGuid, decimal year, decimal month, decimal day, string status)
        {
            return await _TableRepository.Update(id, employeeGuid, year, month, day, status);
        }

        public async Task<Guid> DeleteTable(Guid id)
        {
            return await _TableRepository.Delete(id);
        }
    }
}
