using Backend.Database.Entities;
using Backend.Database.Repository;
using Backend.Database.Repository.Abstarct;
using Backend.Database.Repository.Concrete;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Backend.Tests
{
	public class RepositoryTest
	{
		public SqliteConnection Connection { get; }

		public TestFormContext DbContext { get; }

		public List<TestObject> TestObjects { get; }

		public RepositoryTest()
		{
			Connection = new SqliteConnection("DataSource=:memory:");
			Connection.Open();
			var options = new DbContextOptionsBuilder<TestFormContext>()
				.UseSqlite(Connection)
				.Options;
			DbContext = new TestFormContext(options);
			DbContext.Database.EnsureCreated();
			TestObjects = new List<TestObject>();

			InitData();
		}
		private void InitData()
		{
			using (var t = DbContext.Database.BeginTransaction())
			{
				TestObjects.AddRange(new[]
				{
					new TestObject
					{
						Id=1,
						FieldId1 = "123455.ru",
						FieldId2 =FieldId2Type.TYPE1,
						FieldId5 =FieldId5Type.RADIO1,

					},
					new TestObject
					{
						Id=2,
						FieldId1 = "232342425.ru",
						FieldId2 =FieldId2Type.TYPE2,
						FieldId5 =FieldId5Type.RADIO2,

					},
				});

				TestObjects.ForEach(x => DbContext.TestObjects.Add(x));

				DbContext.SaveChanges();
				t.Commit();
			}
		}

		[Fact]
		public void add_object()
		{
			// In-memory database only exists while the connection is open
			var connection = new SqliteConnection("DataSource=:memory:");
			connection.Open();

			try
			{
				DbContextOptions<TestFormContext> options = new DbContextOptionsBuilder<TestFormContext>()
					.UseSqlite(connection)
					.Options;

				// Create the schema in the database
				using (var context = new TestFormContext(options))
				{
					context.Database.EnsureCreated();
				}

				// Run the test against one instance of the context
				using (var context = new TestFormContext(options))
				{
					ITestObjectRepository _repo = new TestObjectRepository(context);

					var testObject = new TestObject
					{

						FieldId1 = "3333.ru",
						FieldId2 = FieldId2Type.TYPE2,
						FieldId5 = FieldId5Type.RADIO2,

					};

					_repo.Create(testObject);
				}
				
				// Run the test against one instance of the context
				using (var context = new TestFormContext(options))
				{
					ITestObjectRepository _repo = new TestObjectRepository(context);
					var testObjects = _repo.GetAll();
					Assert.False(testObjects.ToList().Count > 2);
					//foreach (var entry in context.ChangeTracker.Entries())
					//{
					//	Assert.Equal("TestObject", entry.Entity.GetType().Name);
					//	Assert.Equal("Added", entry.State.ToString());
				}
			}
			finally
			{
				connection.Close();
			}
		}
		 
		[Fact]
		public void Update_user()
		{
			ITestObjectRepository _repo = new TestObjectRepository(DbContext);

			var user = _repo.GetById(2);
			if (user != null)
			{
				user.FieldId1 = "2222222";
			}
			_repo.Update( user);
			var updatedUser = _repo.GetById(2);

			var allUsers = _repo.GetAll();
			Assert.NotNull(updatedUser);
			Assert.Equal("2222222", updatedUser.FieldId1);
		}

		//[Fact]
		//public void Update_new_user()
		//{
		//	var user = new User
		//	{
		//		Email = "a3@ja3.ru",
		//		IsEmailVerified = false,
		//		FirstName = "1111111",
		//		LastName = "fc322d1",
		//		Phone = "2131",
		//		IsPhoneVerified = false,
		//		State = UserState.DRAFT,
		//		Type = UserType.ISSUER,
		//		Created = DateTime.Now,
		//	};
		//	var createdUser = _repo.Create(user);
		//	createdUser.FirstName = "2222222";
		//	_repo.Update(createdUser.Id, createdUser);

		//	var allUsers = _repo.GetAll();
		//	Assert.NotNull(allUsers);
		//	Assert.True(allUsers.ToList().Count == 3);
		//	Assert.Equal("2222222", allUsers.ToList()[2].FirstName);
		//}

		//[Fact]
		//public void Delete_user()
		//{
		//	var user = _repo.GetById(2);
		//	_repo.Remove(user.Id);
		//	var allUsers = _repo.GetAll();

		//	Assert.NotNull(allUsers);
		//	Assert.True(allUsers.ToList().Count == 1);
		//}


	}
}
