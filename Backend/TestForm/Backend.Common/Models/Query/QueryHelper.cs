using System;
using System.Linq;
using TestForm.Common.Models.Query.Abstract;

namespace TestForm.Common.Models.Query
{
    public static class QueryHelper
    {
        private static (int totalCount, int page, int pageSize, T[] items) ExecutePageQueryCommon<T>(
            IQueryable<T> query,
            IPagedQueryParams queryParams)
        {
            var totalCount = query.Count();
            var page = queryParams.Page;
            var pageSize = queryParams.PageSize;
            query = query.Skip(page * pageSize).Take(pageSize);
            var items = query.ToArray();
            return (totalCount, page, pageSize, items);
        }
        public static PagedQueryResult<T> ExecutePageQuery<T>(
            IQueryable<T> query,
            IPagedQueryParams queryParams)
        {
            var (totalCount, page, pageSize, items) = ExecutePageQueryCommon(query, queryParams);
            return new PagedQueryResult<T>(items, page, pageSize, totalCount);
        }
        
        public static PagedQueryResult<TModel> ExecutePageQuery<TModel, T>(
            IQueryable<T> query,
            IPagedQueryParams queryParams,
            Func<T, TModel> map)
        {
            var (totalCount, page, pageSize, items) = ExecutePageQueryCommon(query, queryParams);
            return new PagedQueryResult<TModel>(items.Select(map).ToArray(), page, pageSize, totalCount);
        }
    }
}
