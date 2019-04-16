namespace TestForm.Common.Models.Query.Abstract
{
	public abstract class PagedQueryParams : IPagedQueryParams
    {
        public int Page { get; set; } = 0;

        public int PageSize { get; set; } = 10;
    }
}
