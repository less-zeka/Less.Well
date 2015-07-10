using System.Data.Entity;
using System.Web.Http;
using Less.Well.WebApi.Models;

namespace Less.Well.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Database.SetInitializer<LessWellWebApiContext>(null);

            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
