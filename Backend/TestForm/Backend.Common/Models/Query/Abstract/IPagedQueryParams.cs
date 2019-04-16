namespace TestForm.Common.Models.Query.Abstract
{
	public interface IPagedQueryParams
	{

		/// <summary>
		///     Номер страницы
		/// </summary>
		int Page { get; }

		/// <summary>
		///     Размер стрницы
		/// </summary>
		int PageSize { get; }
	}
}
