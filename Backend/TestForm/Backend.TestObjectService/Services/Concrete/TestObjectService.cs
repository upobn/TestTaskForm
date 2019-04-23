using AutoMapper;
using Backend.Database.Entities;
using Backend.Database.Repository.Abstarct;
using Backend.TestObjectService.Models.Abstract;
using Backend.TestObjectService.Services.Abstract;
using TestForm.Common.Models.Query;
using TestForm.Users.Models.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using Backend.TestObjectService.Models.Concrete;

namespace Backend.TestObjectService.Services.Concrete
{
	public class TestObjectService : ITestObjectService
	{
		private readonly ITestObjectRepository _repository;
		private readonly IMapper _mapper;

		public TestObjectService(ITestObjectRepository repo, IMapper mapper)
		{
			_mapper = mapper;
			_repository = repo;
		}

		public TestObjectModel Create(TestObjectModel testObjectModel)
		{
			var newtestObject = _repository.Create(_mapper.Map<TestObjectModel, TestObject>(testObjectModel));
			return _mapper.Map<TestObject, TestObjectModel>(newtestObject);
		}

		public IEnumerable<TestObjectModel> GetAll(Func<TestObjectModel, bool> predicate = null)
		{
			return _repository.GetAll().Select(_mapper.Map<TestObject, TestObjectModel>);
		}

		public TestObjectModel GetById(int id)
		{
			var testObject = _repository.GetById(id);
			return _mapper.Map<TestObject, TestObjectModel>(testObject);
		}

		public PagedQueryResult<TestObjectModel> Get(TestObjectQueryParams testObjectQuery)
		{
			var testObjects = _repository.GetAllQuerible();
			if (testObjectQuery == null)
				return QueryHelper.ExecutePageQuery(testObjects, null, _mapper.Map<TestObject, TestObjectModel>);

			return QueryHelper.ExecutePageQuery(testObjects, testObjectQuery, _mapper.Map<TestObject, TestObjectModel>);
		}

		public void Remove( int id)
		{
			var item=_repository.GetById(id);
			 
			_repository.Remove(  item )   ;
 		}

		public TestObjectModel Update(TestObjectModel testObjectModel, int id)
		{
		 
			var testObject = _mapper.Map<TestObjectModel, TestObject>(testObjectModel);
			 _repository.Update(testObject);

			var res = _mapper.Map<TestObject , TestObjectModel>(_repository.GetById(id));
			return res;
		}
	}
}
