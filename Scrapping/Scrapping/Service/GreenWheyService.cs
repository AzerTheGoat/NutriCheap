using System.Text.RegularExpressions;
using HtmlAgilityPack;
using OpenQA.Selenium.PhantomJS;
using Scrapping.Model;
using ScrapySharp.Extensions;

namespace Scrapping.Service
{
    public class GreenWheyService
    {
        private PhantomJSDriver driver;
        private HtmlDocument htmlDocument;

        public GreenWheyService()
        {
            var driverService = PhantomJSDriverService.CreateDefaultService("/home/goat/PhantomJsDriver/phantomjs-2.5.0-beta-ubuntu-xenial/bin");
            driverService.HideCommandPromptWindow = true;
            driver = new PhantomJSDriver(driverService);
            htmlDocument = new HtmlDocument();

            driver.Navigate().GoToUrl("https://greenwhey.com/");
            htmlDocument.LoadHtml(driver.PageSource);
        }

        public IEnumerable<string> GetPromos()
        {
            var announcementListBar = htmlDocument.DocumentNode.CssSelect(".announcement-bar__message.text--xsmall");

            List<string> cleanedLines = new List<string>();

            foreach (var balise in announcementListBar)
            {
                var paragraphElement = balise.CssSelect("p").FirstOrDefault();

                if (paragraphElement != null)
                {
                    var buttonElement = paragraphElement.CssSelect("button").FirstOrDefault();

                    if (buttonElement != null)
                    {
                        var paragraphText = paragraphElement.InnerHtml.Replace(buttonElement.OuterHtml, "").Trim();
                        paragraphText = CleanText(paragraphText);
                        cleanedLines.Add(paragraphText);
                    }
                    else
                    {
                        var paragraphText = paragraphElement.InnerHtml.Trim();
                        paragraphText = CleanText(paragraphText);
                        cleanedLines.Add(paragraphText);
                    }
                }
                else
                {
                    Console.WriteLine("Aucune balise <p> trouvée dans la liste d'annonces.");
                    return Enumerable.Empty<string>();
                }
            }

            return cleanedLines;
        }

        private string CleanText(string text)
        {
            text = Regex.Replace(text, @"\p{Cs}", "");
            text = Regex.Replace(text, @"&quot;", "\"");
            // Ajoutez d'autres remplacements pour d'autres entités HTML si nécessaire

            return text;
        }

        public Company getCompany()
        {
            Company company = new Company();
            company.Nom = "GreenWhey";
            company.Promo = GetPromos();
            return company;
        }
    }
}
