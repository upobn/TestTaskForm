using Backend.Database.Repository.Abstarct;
using Backend.Database.Repository.Concrete;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Database.Repository
{
	   public static class AddRepository
	{
		public static IServiceCollection AddRepositories(this IServiceCollection services)
		{
			services.AddScoped(typeof(ITestObjectRepository), typeof(TestObjectRepository));
						
			return services;
		}
	}
}
