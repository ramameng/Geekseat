using System.Threading.Tasks;
using Application.Interface;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatesController : ControllerBase
    {
        private readonly ICalculate _calculate;
        public CalculatesController(ICalculate calculate)
        {
            _calculate = calculate;
        }

        [HttpPost]
        public async Task<ActionResult<double>> Calculate(Villages villages)
        {
            return await _calculate.Result(villages.PersonA, villages.PersonB);
        }
    }
}