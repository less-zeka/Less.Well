using System.Threading.Tasks;
using System.Web.Mvc;
using Less.Well.WebClient.Models;

namespace Less.Well.WebClient.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new IndexViewModel
            {
                Refresh = true
            };
            return View("Index", model);
        }

        public ActionResult Home()
        {
            var model = new IndexViewModel
            {
                Refresh = true
            };
            return PartialView("Index", model);
        }

        public ActionResult About()
        {

            return PartialView("About");
        }
    }
}