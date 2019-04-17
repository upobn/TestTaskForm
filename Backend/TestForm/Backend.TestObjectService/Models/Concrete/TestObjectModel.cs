using Backend.Database.Entities;
using Backend.TestObjectService.Models.Abstract;
using System;

namespace Backend.TestObjectService.Models.Concrete
{
	public class TestObjectModel : ITestObjectModel
	{
		public int Id { get; set; }
		public string FieldId1 { get; set; }
		public FieldId2Type FieldId2 { get; set; }
		public DateTime? FieldId3 { get; set; }
		public bool? FieldId4 { get; set; }
		public FieldId5Type FieldId5 { get; set; }
	}
}
