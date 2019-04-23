using Backend.Database.Entities;
using Backend.Database.Repository.Abstarct;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Backend.Database.Repository.Concrete
{
	public class TestObjectRepository : ITestObjectRepository
	{
		private readonly TestFormContext _db;

		public TestObjectRepository(TestFormContext db)
		{
			_db = db;
		}

		public TestObject Create(TestObject testObject)
		{
			var newTstObject = new TestObject
			{
				FieldId1 = testObject.FieldId1,
				FieldId2 = testObject.FieldId2,
				FieldId3 = testObject.FieldId3,
				FieldId4 = testObject.FieldId4,
				FieldId5 = testObject.FieldId5,
			};

			var res = (_db.TestObjects.Add(newTstObject)).Entity;

			_db.SaveChanges();

			return res;
		}

		public IEnumerable<TestObject> Get(Func<TestObject, bool> predicate)
		{
			throw new NotImplementedException();
		}

		public IEnumerable<TestObject> GetAll()
		{
			return _db.TestObjects.ToList();
		}

		public IQueryable<TestObject> GetAllQuerible()
		{
			return _db.TestObjects.AsQueryable();
		}

		public TestObject GetById(int id)
		{
			return _db.TestObjects.FirstOrDefault(e => e.Id == id);
		}

		public void Remove(TestObject Entity)
		{
			var testObject = _db.TestObjects.FirstOrDefault(_ => _.Id == Entity.Id);
			if (testObject == null)
			{
				throw new Exception("нет такого Каляка баляка");
			}

			_db.TestObjects.Remove(Entity);

			_db.SaveChanges();
		}

		public void Update(TestObject Entity)
		{

			var testObject = _db.TestObjects.FirstOrDefault(_ => _.Id == Entity.Id);
			if (testObject == null)
			{
				throw new Exception(" нет такого Каляка баляка");
			}
					   			 
			testObject.FieldId1 = Entity.FieldId1;
			testObject.FieldId2 = Entity.FieldId2;
			testObject.FieldId3 = Entity.FieldId3;
			testObject.FieldId4 = Entity.FieldId4;
			testObject.FieldId5 = Entity.FieldId5;

			_db.TestObjects.Update(testObject);

			_db.SaveChanges();
		}
	}
}
