using System;
using System.Linq;
using Backend.TestObjectService.Models.Abstract;
using Backend.TestObjectService.Models.Concrete;
using Backend.TestObjectService.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using TestForm.Common.Models.Query;
using TestForm.Users.Models.Concrete;

namespace TestForm.Controllers
{
	[Route("api/testObjects")]
	[ApiController]
	public class TestObjectsController : ControllerBase
	{
		private readonly ITestObjectService _testObjectService;

		public TestObjectsController(ITestObjectService testObjectService)
		{
			_testObjectService = testObjectService;
		}

		[HttpGet]
		public PagedQueryResult<ITestObjectModel> Get([FromQuery] TestObjectQueryParams testObjectQuery)
		{
			var result = _testObjectService.Get(testObjectQuery);
			return result;
		}

		[HttpGet("all")]
		public IActionResult GetAll()
		{
			var objs = _testObjectService.GetAll();
			return Ok(objs);
		}


		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var result = _testObjectService.GetById(id);
			if (result != null) return Ok(result);
			return NotFound();
		}

		[HttpPost]
		public IActionResult Post([FromBody] TestObjectModel testObjectModel)
		{
			var createdTestObjectModel = _testObjectService.Create(testObjectModel);
			return Ok(createdTestObjectModel);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody] TestObjectModel testObjectModel)
		{
			var updatedTestObjectModel = _testObjectService.Update(testObjectModel);
			return Ok(updatedTestObjectModel);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var testObject = _testObjectService.GetById(id);
			var removedTestObjectModel = _testObjectService.Remove(testObject);
			return Ok(removedTestObjectModel);
		}
	}
}
