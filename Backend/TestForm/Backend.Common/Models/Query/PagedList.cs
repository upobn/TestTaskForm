namespace TestForm.Common.Models.Query
{
    /// <summary>
    ///     Постраничный список
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PagedList<T>
    {
        internal PagedList(T[] items, int page, int pageSize, int totalCount)
        {
            Items = items;
            Page = page;
            PageSize = pageSize;
            TotalCount = totalCount;
        }

        /// <summary>
        ///     Элементы на странице
        /// </summary>
        public T[] Items { get; }

        /// <summary>
        ///     Номер страницы
        /// </summary>
        public int Page { get; }

        /// <summary>
        ///     Размер страницы
        /// </summary>
        public int PageSize { get; }

        /// <summary>
        ///     Общее число элементов
        /// </summary>
        public int TotalCount { get; }
    }
}
