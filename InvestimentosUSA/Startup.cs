using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(InvestimentosUSA.Startup))]
namespace InvestimentosUSA
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
