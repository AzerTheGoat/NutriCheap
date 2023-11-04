namespace Scrapping.Model;

public class Company
{
    public string Nom { get; set; }
    public IEnumerable<string> Promo { get; set; }
}