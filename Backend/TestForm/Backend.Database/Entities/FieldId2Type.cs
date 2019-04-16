using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Backend.Database.Entities
{
	[JsonConverter(typeof(StringEnumConverter))]
	public enum FieldId2Type
	{
		[EnumMember(Value = "Type1")]
		TYPE1,

		[EnumMember(Value = "Type2")]
		TYPE2,
	}
}
