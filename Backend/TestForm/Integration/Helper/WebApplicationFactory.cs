using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Backend.IntegrationTests.Helper
{
	public class WebApplicationFactoryCustom<T> : WebApplicationFactory<T>
				where T : class
	{
		protected override void ConfigureWebHost(IWebHostBuilder builder)
		{
			base.ConfigureWebHost(builder);

			var environment = "Testing";

			if (!string.IsNullOrEmpty(environment))
			{
				builder.UseEnvironment(environment);
			}
		}
	}
}
