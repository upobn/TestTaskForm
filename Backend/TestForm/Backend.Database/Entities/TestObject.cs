using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Backend.Database.Entities
{
	public class TestObject 
	{
		[Key]
		public int Id { get; set; }
		public string FieldId1 { get; set; }

		[NotMapped]
		public FieldId2Type FieldId2 { get; set; }

		[Column("FieldId2_type"), Required]
		public string FieldId2ToString
		{
			get => FieldId2.ToString().ToUpperInvariant();
			set => FieldId2 = Enum.Parse<FieldId2Type>(value, true);
		}
			   


		public DateTime? FieldId3 { get; set; }




		public bool? FieldId4 { get; set; }

		[NotMapped]
		public FieldId5Type? FieldId5 { get; set; }

		[Column("FieldId5_type"), Required]
		public string FieldId5ToString
		{
			get => FieldId5.ToString().ToUpperInvariant();
			set => FieldId5 = Enum.Parse<FieldId5Type>(value, true);
		}
	}
}
