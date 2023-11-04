using System.Text.RegularExpressions;
using HtmlAgilityPack;
using Scrapping.Model;
using ScrapySharp.Extensions;
using ScrapySharp.Network;

namespace Scrapping.Service;

public class BulkService
{
    private ScrapingBrowser browser;
    private WebPage WebPage;

    public BulkService()
    {
        browser = new ScrapingBrowser();
        WebPage = browser.NavigateToPage(new Uri("https://www.bulk.com/fr/"));
    }
    
    public IEnumerable<string> getPromos()
    {
        return null;
    }

    public Company getCompany()
    {
        Company company = new Company();
        company.Nom = "Bulk";
        company.Promo = getPromos();
        return company ;
    }

}
