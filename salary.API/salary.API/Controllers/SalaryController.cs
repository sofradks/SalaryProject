using Microsoft.AspNetCore.Mvc;
using salary.API.Contracts;
using salary.Application.Services;
using salary.Core.Models;

namespace salary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<SalaryResponse>>> GetSalary()
        {
            var salary = await _salaryService.GetAllSalary();
            var response = salary.Select(p => new SalaryResponse(p.ID, p.EmployeeGuid, p.EmployeeString, p.Year, p.Month, p.Hours, p.Summ));
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateSalary([FromBody] SalaryRequest request)
        {
            var salary = new Salary(
                Guid.NewGuid(),
                request.EmployeeGuid,
                request.Year,
                request.Month,
                0,
                0
                );

            var salaryId = await _salaryService.CreateSalary(salary);

            return Ok(salaryId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateSalary(Guid id, [FromBody] SalaryRequest request)
        {
            var salaryId = await _salaryService.UpdateSalary(
                id, 
                request.EmployeeGuid,
                request.Year,
                request.Month,
                0,
                0
                );

            return Ok(salaryId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteSalary(Guid id)
        {
            return Ok(await _salaryService.DeleteSalary(id));
        }
    }
}