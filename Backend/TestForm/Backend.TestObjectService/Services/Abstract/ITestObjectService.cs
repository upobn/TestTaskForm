using Backend.TestObjectService.Models.Abstract;
using TestForm.Common.Models.Query;
using TestForm.Users.Models.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.TestObjectService.Services.Abstract
{
	public interface ITestObjectService
	{
		ITestObjectModel GetById(int id);


		PagedQueryResult<ITestObjectModel> Get(TestObjectQueryParams testObjectQuery);


		IEnumerable<ITestObjectModel> GetAll(Func<ITestObjectModel, bool> predicate = null);


		ITestObjectModel Create(ITestObjectModel testObjectModel);


		ITestObjectModel Update(ITestObjectModel testObjectModel);


		ITestObjectModel Remove(ITestObjectModel testObjectModel);
	}


}
