using Backend.Database.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.TestObjectService.Models.Abstract
{
	public interface ITestObjectModel
	{
		int Id { get; set; }

		 FieldId2Type FieldId2 { get; set; }

		 DateTime? FieldId3 { get; set; }

		 bool? FieldId4 { get; set; }

		 FieldId5Type? FieldId5 { get; set; }
	}
}
