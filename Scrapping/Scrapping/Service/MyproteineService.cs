using HtmlAgilityPack;
using Scrapping.Model;
using ScrapySharp.Extensions;
using ScrapySharp.Network;

namespace Scrapping.Service;

public class MyproteineService 
{
    private ScrapingBrowser browser;
    private WebPage WebPage;

    public MyproteineService()
    {
        browser = new ScrapingBrowser();
        WebPage = browser.NavigateToPage(new Uri("https://fr.myprotein.com/"));
    }


    public IEnumerable<string> getPromos()
    {
        var divStripBanner = WebPage.Html.CssSelect("div.stripBanner").FirstOrDefault();

        if (divStripBanner != null)
        {
            // Récupérez le contenu du div
            var divContent = divStripBanner.InnerHtml;

            // Divisez le contenu en lignes en utilisant <br> comme séparateur
            var lines = divContent.Split(new string[] { "<br>" }, StringSplitOptions.RemoveEmptyEntries);

            List<string> cleanedLines = new List<string>();

            foreach (string line in lines)
            {
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(line);

                // Récupérez le contenu textuel de la ligne en utilisant InnerText
                var lineText = htmlDoc.DocumentNode.InnerText;
                lineText = lineText.Replace("\t", "").Replace("\n", "");

                cleanedLines.Add(lineText);
            }

            // Retournez les lignes nettoyées dans une liste IEnumerable<string>
            return cleanedLines;
        }
        else
        {
            Console.WriteLine("La promo pour MyProteine n'a pas ete trouvé");
            return Enumerable.Empty<string>(); // Retourne une liste vide si le div n'est pas trouvé
        }
    }

    public Company getCompany()
    {
        Company company = new Company();
        company.Nom = "MyProtein";
        company.Promo = getPromos();
        return company ;
    }





}