namespace Scrapping.Model;

public class Product
{
    public string Nom { get; set; }
    public Dictionary<int, int> PrixPoid{ get; set; }
    public int Rate { get; set; }
}