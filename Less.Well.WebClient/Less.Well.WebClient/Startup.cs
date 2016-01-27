using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Less.Well.WebClient.Startup))]
namespace Less.Well.WebClient
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
