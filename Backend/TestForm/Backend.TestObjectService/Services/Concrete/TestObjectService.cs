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

		public ITestObjectModel Create(ITestObjectModel testObjectModel)
		{
			var newtestObject = _repository.Create(_mapper.Map<ITestObjectModel, TestObject>(testObjectModel));
			return _mapper.Map<TestObject, ITestObjectModel>(newtestObject);
		}

		public IEnumerable<ITestObjectModel> GetAll(Func<ITestObjectModel, bool> predicate = null)
		{
			return _repository.GetAll().Select(_mapper.Map<TestObject, ITestObjectModel>);
		}

		public ITestObjectModel GetById(int id)
		{
			var testObject = _repository.GetById(id);
			return _mapper.Map<TestObject, ITestObjectModel>(testObject);
		}

		public PagedQueryResult<ITestObjectModel> Get(TestObjectQueryParams testObjectQuery)
		{
			var testObjects = _repository.GetAllQuerible();
			if (testObjectQuery == null)
				return QueryHelper.ExecutePageQuery(testObjects, null, _mapper.Map<TestObject, ITestObjectModel>);

			return QueryHelper.ExecutePageQuery(testObjects, testObjectQuery, _mapper.Map<TestObject, ITestObjectModel>);
		}

		public ITestObjectModel Remove(ITestObjectModel testObjectModel)
		{
			_repository.Remove(_mapper.Map<ITestObjectModel, TestObject>(testObjectModel));
			return testObjectModel;
		}

		public ITestObjectModel Update(ITestObjectModel testObjectModel)
		{
			var testObject = _mapper.Map<ITestObjectModel, TestObject>(testObjectModel);

			_repository.Update(testObject);
			return testObjectModel;
		}
	}
}
