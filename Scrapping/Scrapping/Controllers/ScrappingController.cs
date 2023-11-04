using System.Net;
using Microsoft.AspNetCore.Mvc;
using Scrapping.Model;
using Scrapping.Service;
using ScrapySharp.Extensions;
using ScrapySharp.Network;

[ApiController]
[Route("api/[controller]")]
public class ScrappingController : ControllerBase
{
    private MyproteineService MyproteineService;
    private GreenWheyService GreenWheyService;
    private BulkService BulkService;

    public ScrappingController()
    {
        BulkService = new BulkService();
        GreenWheyService = new GreenWheyService();
        MyproteineService = new MyproteineService();
    }
    
    [HttpGet("getCompany")]
    public IActionResult getPromo()
    {
        List<Company> Companies = new List<Company>();
        Companies.Add(MyproteineService.getCompany());
        Companies.Add(GreenWheyService.getCompany());
        Companies.Add(BulkService.getCompany());

        return Ok(Companies);
    }
    
    
}