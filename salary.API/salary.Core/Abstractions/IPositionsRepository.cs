using salary.Core.Models;

namespace salary.DataAccess.Repository
{
    public interface IPositionsRepository
    {
        Task<Guid> Create(Position position);
        Task<Guid> Delete(Guid id);
        Task<List<Position>> Get();
        Task<Guid> Update(Guid id, string name, decimal hours, decimal salary);
    }
}