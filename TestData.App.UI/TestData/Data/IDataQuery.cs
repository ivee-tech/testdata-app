using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{
    public interface IDataQuery<T, TKey> 
        where T : ObjectBase<TKey>
        where TKey : IComparable
    {

        T Find(TKey key);
        Task<T> FindAsync(TKey key);
        IEnumerable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync();
        IEnumerable<T> Filter(Expression<Func<T, bool>> predicate);
        PageData<T> FilterPage(Expression<Func<T, bool>> predicate, PageInfo pageInfo);
        Task<IEnumerable<T>> FilterAsync(Expression<Func<T, bool>> predicate);
        Task<PageData<T>> FilterPageAsync(Expression<Func<T, bool>> predicate, PageInfo pageInfo);
        IEnumerable<T> FilterByCondition(IFilterValue condition);
        PageData<T> FilterByConditionPage(IFilterValue condition, PageInfo pageInfo);
        Task<IEnumerable<T>> FilterByConditionAsync(IFilterValue condition);
        Task<PageData<T>> FilterByConditionPageAsync(IFilterValue condition, PageInfo pageInfo);
        int GetCount(Expression<Func<T, bool>> predicate);
        Task<int> GetCountAsync(Expression<Func<T, bool>> predicate);
        int GetCountByCondition(IFilterValue condition);
        Task<int> GetCountByConditionAsync(IFilterValue condition);
    }
}
