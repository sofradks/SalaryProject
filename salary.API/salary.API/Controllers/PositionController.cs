using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salary.API.Contracts;
using salary.Application.Services;
using salary.Core.Models;

namespace salary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;

        public PositionController(IPositionService positionService) 
        {
            _positionService= positionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PositionResponse>>> GetPositions()
        {
            var positions = await _positionService.GetAllPositions();
            var response = positions.Select(p => new PositionResponse(p.ID, p.Name, p.Hours, p.Salary));
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreatePosition([FromBody] PositionRequest request)
        {
            var (position, error) = Position.Create(
                Guid.NewGuid(),
                request.Name,
                request.Hours,
                request.Salary);
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }

            var positionId = await _positionService.CreatePosition(position);

            return Ok(positionId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdatePositions(Guid id, [FromBody] PositionRequest request)
        {
            var positionId = await _positionService.UpdatePosition(id, request.Name, request.Hours, request.Salary);

            return Ok(positionId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeletePosition(Guid id)
        {
            return Ok(await _positionService.DeletePosition(id));
        }
    }
}