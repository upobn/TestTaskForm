using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Backend.Database.Entities
{
	[JsonConverter(typeof(StringEnumConverter))]
	public enum FieldId5Type
	{
		[EnumMember(Value = "Radio1")]
		RADIO1,

		[EnumMember(Value = "Radio2")]
		RADIO2,
	}
}
