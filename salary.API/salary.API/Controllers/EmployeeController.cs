using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salary.API.Contracts;
using salary.Application.Services;
using salary.Core.Models;
using System.Collections.Generic;
using System.Xml.Linq;

namespace salary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<EmployeeResponse>>> GetEmployees()
        {
            var employees = await _employeeService.GetAllEmployees();
            var response = employees.Select(p => new EmployeeResponse(p.ID, p.Surname, p.Name, p.Patronymic, p.Snils, p.PSeria, p.PNumber,
                p.Rate,p.DateOfReceipt, p.DateOfDismissal, p.PositionGuid, p.PositionString, p.PrivilegesGuid, p.PrivilegesString));
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateEmployee([FromBody] EmployeeRequest request)
        {
            var employee = new Employee(
                Guid.NewGuid(),
                request.Surname,
                request.Name,
                request.Patronymic,
                request.Snils,
                request.PSeria,
                request.PNumber,
                request.Rate,
                request.DateOfReceipt,
                request.DateOfDismissal,
                request.PositionGuid,
                request.PrivilegesGuid);

            var employeeId = await _employeeService.CreateEmployee(employee);

            return Ok(employeeId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateEmployee(Guid id, [FromBody] EmployeeRequest request)
        {
            var employeeId = await _employeeService.UpdateEmployee(
                id,
                request.Surname,
                request.Name,
                request.Patronymic,
                request.Snils,
                request.PSeria,
                request.PNumber,
                request.Rate,
                request.DateOfReceipt,
                request.DateOfDismissal,
                request.PositionGuid,
                request.PrivilegesGuid);

            return Ok(employeeId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteEmployee(Guid id)
        {
            return Ok(await _employeeService.DeleteEmployee(id));
        }
    }
}