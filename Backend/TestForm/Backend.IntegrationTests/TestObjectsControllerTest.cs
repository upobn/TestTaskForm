using Backend.Database.Entities;
using Backend.IntegrationTests.Helper;
using Backend.TestObjectService.Models.Concrete;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestForm;
using TestForm.Common.Models.Query;
using Xunit;

namespace Backend.IntegrationTests
{
	public class TestObjectsControllerTest : IClassFixture<WebApplicationFactoryCustom<Startup>>
	{
		private HttpClient Client { get; set; }

		private TestObjectModel TestObjectModel { get; } = new TestObjectModel
		{
			Id = 1,
			FieldId1 = "asdf",
			FieldId2 = FieldId2Type.TYPE1,

			FieldId3 = DateTime.UtcNow,
			FieldId4 = false,
			FieldId5 = FieldId5Type.RADIO1,
		};

		public TestObjectsControllerTest(WebApplicationFactoryCustom<Startup> factory)
		{
			var builder = Program.CreateWebHostBuilder(new string[0]);
			factory.WithWebHostBuilder(x => builder.UseEnvironment("Testing").Build());
			Client = factory.CreateClient();
		}

		[Fact]
		public async Task GetTestObjectrsTest()
		{
			// GIVEN
			var currentListOfTestObjects =
				JsonConvert.DeserializeObject<PagedQueryResult<TestObjectModel>>(
					await (await Client.GetAsync("api/testObjects")).Content.ReadAsStringAsync());


			var content = new StringContent(JsonConvert.SerializeObject(TestObjectModel), Encoding.UTF8, "application/json");
			await Client.PostAsync("api/testObjects", content);
			await Client.PostAsync("api/testObjects", content);
			await Client.PostAsync("api/testObjects", content);

			// WHEN
			var response = await Client.GetAsync("api/testObjects");

			var contents = await response.Content.ReadAsStringAsync();
			var result = JsonConvert.DeserializeObject<PagedQueryResult<TestObjectModel>>(contents);

			// THEN            
			Assert.NotNull(result);
			Assert.Equal(0, result.Page);
			Assert.Equal(10, result.PageSize);
			Assert.Equal(currentListOfTestObjects.TotalCount + 3, result.TotalCount);
			Assert.Equal(currentListOfTestObjects.Items.Length + 3, result.Items.Length);
			//            All(result.Items, _ => True(_.Id > 0));
			//            All(result.Items, _ =>
			//            {
			//                TestObject.Id = _.Id;
			//                Same(TestObject, _);
			//            });
		}

		[Fact]
		public async Task GetTestObjectrsByIdsTest()
		{
			// GIVEN
			var content = new StringContent(JsonConvert.SerializeObject(TestObjectModel), Encoding.UTF8, "application/json");
			var firstTestObject = JsonConvert.DeserializeObject<TestObjectModel>(await (await Client.PostAsync("api/testObjects", content)).Content.ReadAsStringAsync());
			await Client.PostAsync("api/testObjects", content);
			var secondTestObject = JsonConvert.DeserializeObject<TestObjectModel>(await (await Client.PostAsync("api/testObjects", content)).Content.ReadAsStringAsync());

			// WHEN
			var response = await Client.GetAsync($"api/testObjects?ids={firstTestObject.Id}&ids={secondTestObject.Id}");

			var contents = await response.Content.ReadAsStringAsync();
			var result = JsonConvert.DeserializeObject<PagedQueryResult<TestObjectModel>>(contents);

			// THEN            
			Assert.NotNull(result);
			Assert.Equal(0, result.Page);
			Assert.Equal(10, result.PageSize);
			Assert.Equal(2, result.TotalCount);
			Assert.Equal(2, result.Items.Length);
			Assert.All(result.Items, _ => Assert.True(_.Id > 0));
			Assert.Equal(firstTestObject.Id, result.Items[0].Id);
			Assert.Equal(secondTestObject.Id, result.Items[1].Id);
			//           All(result.Items, _ =>
			//           {
			//                TestObject.Id = _.Id;
			//                Same(TestObject, _);
			//            });
		}

		[Fact]
		public async Task GetTest()
		{
			// GIVEN
			var content = new StringContent(JsonConvert.SerializeObject(TestObjectModel), Encoding.UTF8, "application/json");
			var testObject = JsonConvert.DeserializeObject<TestObjectModel>(await (await Client.PostAsync("api/testObjects", content)).Content.ReadAsStringAsync());

			// WHEN
			var response = await Client.GetAsync($"api/testObjects/{testObject.Id}");

			var contents = await response.Content.ReadAsStringAsync();
			var result = JsonConvert.DeserializeObject<TestObjectModel>(contents);

			// THEN
			Assert.NotNull(result);
			Assert.True(result.Id > 0);
			Assert.Equal(testObject.Id, result.Id);
		}

		[Fact]
		public async Task PostTest()
		{
			// GIVEN
			var content = new StringContent(JsonConvert.SerializeObject(TestObjectModel), Encoding.UTF8, "application/json");

			// WHEN            
			var response = await Client.PostAsync("api/testObjects", content);

			var contents = await response.Content.ReadAsStringAsync();
			var result = JsonConvert.DeserializeObject<TestObjectModel>(contents);

			// THEN
			Assert.NotNull(result);
			Assert.True(result.Id > 0);
		}

		[Fact]
		public async Task PutTest()
		{
			// GIVEN
			var content = new StringContent(JsonConvert.SerializeObject(TestObjectModel), Encoding.UTF8, "application/json");
			var testObject = JsonConvert.DeserializeObject<TestObjectModel>(await (await Client.PostAsync("api/testObjects", content)).Content.ReadAsStringAsync());

			const string FieldId1 = "Новый TestObject";
			var FieldId1Old = testObject.FieldId1;
			testObject.FieldId1 = FieldId1;

			// WHEN

			content = new StringContent(JsonConvert.SerializeObject(testObject), Encoding.UTF8, "application/json");
			var response = await Client.PutAsync($"api/testObjects/{testObject.Id}", content);

			var contents = await response.Content.ReadAsStringAsync();
			var result = JsonConvert.DeserializeObject<TestObjectModel>(contents);

			// THEN
			Assert.NotNull(result);
			Assert.Equal(testObject.Id, result.Id);
			Assert.NotEqual(FieldId1, result.FieldId1);
		}

		[Fact]
		public async Task DeleteTest()
		{
			// GIVEN
			var content = new StringContent(JsonConvert.SerializeObject(TestObjectModel), Encoding.UTF8, "application/json");
			var testObject = JsonConvert.DeserializeObject<TestObjectModel>(await (await Client.PostAsync("api/testObjects", content)).Content.ReadAsStringAsync());

			// WHEN
			await Client.DeleteAsync($"api/testObjects/{testObject.Id}");
			var response = await Client.GetAsync($"api/testObjects/{testObject.Id}");

			// THEN 
			Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);

		}
	}
}
