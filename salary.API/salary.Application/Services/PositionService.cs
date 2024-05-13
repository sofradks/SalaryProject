using salary.Core.Models;
using salary.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salary.Application.Services
{
    public class PositionService : IPositionService
    {

        private readonly IPositionsRepository _positionsRepository;
        public PositionService(IPositionsRepository positionRepository)
        {
            _positionsRepository = positionRepository;
        }

        public async Task<List<Position>> GetAllPositions()
        {
            return await _positionsRepository.Get();
        }

        public async Task<Guid> CreatePosition(Position position)
        {
            return await _positionsRepository.Create(position);
        }

        public async Task<Guid> UpdatePosition(Guid id, string name, decimal hours, decimal salary)
        {
            return await _positionsRepository.Update(id, name, hours, salary);
        }

        public async Task<Guid> DeletePosition(Guid id)
        {
            return await _positionsRepository.Delete(id);
        }
    }
}
