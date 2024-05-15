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
    public class TableController : ControllerBase
    {
        private readonly ITableService _tableService;

        public TableController(ITableService tableService)
        {
            _tableService = tableService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TableResponse>>> GetTables()
        {
            var tables = await _tableService.GetAllTables();
            var response = tables.Select(p => new TableResponse(p.ID, p.EmployeeGuid, p.EmployeeString, p.Year, p.Month, p.Day, p.Status));
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateTable([FromBody] TableRequest request)
        {
            var table = new Table(
                Guid.NewGuid(),
                request.EmployeeGuid,
                request.Year,
                request.Month,
                request.Day,
                request.Status);

            var tableId = await _tableService.CreateTable(table);

            return Ok(tableId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateTable(Guid id, [FromBody] TableRequest request)
        {
            var tableId = await _tableService.UpdateTable(
                id,
                request.EmployeeGuid,
                request.Year,
                request.Month,
                request.Day,
                request.Status);

            return Ok(tableId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteTable(Guid id)
        {
            return Ok(await _tableService.DeleteTable(id));
        }
    }
}