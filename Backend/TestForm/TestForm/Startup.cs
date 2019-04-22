using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Database.Repository;
using Backend.TestObjectService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace TestForm
{
	public class Startup
	{
		public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
		{
			Configuration = configuration;
			HostingEnvironment = hostingEnvironment;
		}

		public IHostingEnvironment HostingEnvironment { get; }

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddCors();
			
			services.AddMemoryCache();
			services.AddAutoMapper();
			if (HostingEnvironment?.IsEnvironment("Testing") ?? false)
			{
				var connection = new SqliteConnection("DataSource=:memory:");
				connection.Open();
				services.AddDbContext<TestFormContext>(options => { options.UseSqlite(connection); });

				services.BuildServiceProvider()
					.GetRequiredService<TestFormContext>()
					.Database
					.EnsureCreated();
			}
			else
			{
				var connectionString = @"Server = (localdb)\mssqllocaldb; Database = MyDatabase; Trusted_Connection = True;";
				services.AddDbContext<TestFormContext>(options => options.UseSqlServer(connectionString));

			}

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
			services.AddRepositories();

			services.AddTestObjectService();
			services.AddRepositories();
		}

		private static void UpdateDatabase(IApplicationBuilder app)
		{
			using (var serviceScope = app.ApplicationServices
				.GetRequiredService<IServiceScopeFactory>()
				.CreateScope())
			{
				using (var context = serviceScope.ServiceProvider.GetService<TestFormContext>())
				{
					context.Database.Migrate();
				}
			}
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			// Поддержка reverse proxy
			app.UseForwardedHeaders();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
			if (!(HostingEnvironment?.IsEnvironment("Testing") ?? false))
			{
				UpdateDatabase(app);
			}
			
			//app.UseHttpsRedirection();
			app.UseMvc();
		}
	}
}
