using Backend.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Backend.Database.Repository.Abstarct
{
	public interface ITestObjectRepository
	{
		TestObject GetById(int id);
		IEnumerable<TestObject> GetAll();
		IQueryable<TestObject> GetAllQuerible();
		IEnumerable<TestObject> Get(Func<TestObject, bool> predicate);
		TestObject Create(TestObject Entity);
		void Update(TestObject Entity);
		void Remove(TestObject Entity);
	}
}
