using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{
    public interface IDataCommand<T, TKey>
        where T : ObjectBase<TKey>
        where TKey : IComparable
    {

        T Create(T entity);
        Task<T> CreateAsync(T entity);
        void Delete(T entity);
        Task DeleteAsync(T entity);
        T Update(T entity);
        Task<T> UpdateAsync(T entity);
        void SaveChanges();
    }
}
