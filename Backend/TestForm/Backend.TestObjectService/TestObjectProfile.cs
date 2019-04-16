using AutoMapper;
using Backend.Database.Entities;
using Backend.TestObjectService.Models.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.TestObjectService
{
	class TestObjectProfile : Profile
	{
		public TestObjectProfile()
		{
			CreateMap<TestObject, TestObjectModel>()

				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.FieldId1, opts => opts.MapFrom(src => src.FieldId1))
				.ForMember(dest => dest.FieldId2, opts => opts.MapFrom(src => src.FieldId2))
				.ForMember(dest => dest.FieldId3, opts => opts.MapFrom(src => src.FieldId3))
				.ForMember(dest => dest.FieldId4, opts => opts.MapFrom(src => src.FieldId4))
				.ForMember(dest => dest.FieldId5, opts => opts.MapFrom(src => src.FieldId5))

				.ReverseMap()
				.ForAllOtherMembers(opt => opt.Ignore());

		}
	}
}
