using salary.Core.Models;

namespace salary.Application.Services
{
    public interface IPositionService
    {
        Task<Guid> CreatePosition(Position position);
        Task<Guid> DeletePosition(Guid id);
        Task<List<Position>> GetAllPositions();
        Task<Guid> UpdatePosition(Guid id, string name, decimal hours, decimal salary);
    }
}