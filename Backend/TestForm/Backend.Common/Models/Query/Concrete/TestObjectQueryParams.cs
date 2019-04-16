using System.Runtime.Serialization;
using TestForm.Common.Models.Query.Abstract;
using TestForm.Users.Models.Interfaces;

namespace TestForm.Users.Models.Concrete
{
	[DataContract]
	public class TestObjectQueryParams : PagedQueryParams, ITestObjectQueryParams
	{
	 
	}
}
