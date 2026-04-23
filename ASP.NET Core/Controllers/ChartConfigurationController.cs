using System.Text.Json;
using ASP_NET_Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP_NET_Core.Controllers;

[Route("api/[controller]")]
public class ChartConfigurationController : Controller
{
    private static readonly JsonSerializerOptions CamelCaseJson = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    [HttpGet]
    public IActionResult Get()
    {
        return new JsonResult(ChartConfiguration.Create(), CamelCaseJson);
    }
}
