using Backend.Database.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Database.Repository
{
	public class TestFormContext : DbContext
	{
		public TestFormContext(DbContextOptions<TestFormContext> options)
			: base(options)
		{ }

		public DbSet<TestObject> TestObjects { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<TestObject>().ToTable("TestObjects");
		}
	}
}
