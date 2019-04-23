using Backend.TestObjectService.Models.Abstract;
using TestForm.Common.Models.Query;
using TestForm.Users.Models.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Backend.TestObjectService.Models.Concrete;

namespace Backend.TestObjectService.Services.Abstract
{
	public interface ITestObjectService
	{
		TestObjectModel GetById(int id);


		PagedQueryResult<TestObjectModel> Get(TestObjectQueryParams testObjectQuery);


		IEnumerable<TestObjectModel> GetAll(Func<TestObjectModel, bool> predicate = null);


		TestObjectModel Create(TestObjectModel testObjectModel);


		TestObjectModel Update(TestObjectModel testObjectModel, int id);

		void Remove(int id);
	}


}
