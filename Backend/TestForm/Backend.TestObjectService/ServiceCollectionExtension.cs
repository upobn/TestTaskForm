using Backend.TestObjectService.Services.Abstract;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.TestObjectService
{
	public static partial class ServiceCollectionExtension
	{
		public static IServiceCollection AddTestObjectService(this IServiceCollection services)
		{
			services.AddScoped<ITestObjectService, Services.Concrete.TestObjectService>();
			return services;
		}
	}
}
