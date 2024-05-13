using Microsoft.AspNetCore.Mvc;
using salary.API.Contracts;
using salary.Application.Services;
using salary.Core.Models;

namespace salary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PrivilegeController : ControllerBase
    {
        private readonly IPrivilegeService _privilegeService;

        public PrivilegeController(IPrivilegeService privilegeService) 
        {
            _privilegeService = privilegeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PrivilegeResponse>>> GetPrivileges()
        {
            var privileges = await _privilegeService.GetAllPrivileges();
            var response = privileges.Select(p => new PrivilegeResponse(p.ID, p.Name, p.Allowance));
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreatePrivilege([FromBody] PrivilegeRequest request)
        {
            var privilege= new Privilege(
                Guid.NewGuid(),
                request.Name,
                request.Allowance);

            var privilegeId = await _privilegeService.CreatePrivilege(privilege);

            return Ok(privilegeId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdatePrivileges(Guid id, [FromBody] PrivilegeRequest request)
        {
            var privilegeId = await _privilegeService.UpdatePrivilege(id, request.Name, request.Allowance);

            return Ok(privilegeId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeletePosition(Guid id)
        {
            return Ok(await _privilegeService.DeletePrivilege(id));
        }
    }
}