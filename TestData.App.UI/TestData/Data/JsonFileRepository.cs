using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;

using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{

    /// <summary>
    /// Simple repository that uses Json files as storage.
    /// </summary>
    /// <remarks>The T type must be JSON serializable.</remarks>
    public class JsonFileRepository<T, TKey> : IDataQuery<T, TKey>, IDataCommand<T, TKey>
        where T : ObjectBase<TKey>
        where TKey : IComparable

    {

        private readonly IFileSystem _fileSystem;
        private List<T> _list;
        private string _fileName;
        private T _item;

        public JsonFileRepository(IFileSystem fileSystem)
        {
            _item = null;
            _list = new List<T>();
            this._fileSystem = fileSystem;
        }

        public string StoreName { get => _fileName; }

        public T Create(T t)
        {
            LoadList();
            _item = t;
            _list.Add(_item);
            SaveList();
            return _item;
        }

        public async Task<T> CreateAsync(T t)
        {
            await LoadListAsync();
            _item = t;
            _list.Add(_item);
            await SaveListAsync();
            return _item;
        }

        public IEnumerable<T> GetAll()
        {
            LoadList();
            return _list;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            await LoadListAsync();
            return _list;
        }

        public IEnumerable<T> Filter(Expression<Func<T, bool>> predicate)
        {
            LoadList();
            var q = _list.AsQueryable().Where(predicate);
            return q.ToList();
        }

        public async Task<IEnumerable<T>> FilterAsync(Expression<Func<T, bool>> predicate)
        {
            await LoadListAsync();
            var q = _list.AsQueryable().Where(predicate);
            return q.ToList();
        }

        public T Update(T t)
        {
            LoadList();
            _item = _list.Where(x => x.Key.Equals(t.Key)).FirstOrDefault();
            if(_item != null)
            {
                _list.Remove(_item);
                _list.Add(t);
                SaveList();
                return t;
            }
            return null;
        }
        public async Task<T> UpdateAsync(T t)
        {
            await LoadListAsync();
            _item = _list.Where(x => x.Key.Equals(t.Key)).FirstOrDefault();
            if (_item != null)
            {
                _list.Remove(_item);
                _list.Add(t);
                await SaveListAsync();
                return t;
            }
            return null;
        }

        public void Delete(T t)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(T t)
        {
            throw new NotImplementedException();
        }

        public T Find(Expression<Func<T, bool>> predicate)
        {
            LoadList();
            _item = _list.AsQueryable().Where(predicate).FirstOrDefault();
            return _item;
        }
        public T Find(TKey key)
        {
            LoadList();
            _item = _list.Where(x => x.Key.Equals(key)).SingleOrDefault();
            return _item;
        }

        public async Task<T> FindAsync(TKey key)
        {
            await LoadListAsync();
            _item = _list.Where(x => x.Key.Equals(key)).SingleOrDefault();
            return _item;
        }

        public void Initialize(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                throw new ArgumentNullException("fileName", "The file name cannot be empty.");
            }
            _fileName = fileName;
        }

        #region Private methods

        private void LoadItem()
        {
            if (string.IsNullOrEmpty(_fileName))
            {
                throw new ArgumentNullException("fileName", "The file name cannot be empty.");
            }
            if (!(_fileSystem.FileExists(_fileName)))
            {
                _item = null;
            }
            else
            {
                var content = _fileSystem.ReadAllText(_fileName);
                _item = JsonConvert.DeserializeObject<T>(content);
            }
        }

        private void SaveItem()
        {
            var content = JsonConvert.SerializeObject(_item);
            _fileSystem.WriteAllText(_fileName, content);
        }

        private void LoadList()
        {
            if (string.IsNullOrEmpty(_fileName))
            {
                throw new ArgumentNullException("fileName", "The file name cannot be empty.");
            }
            if (!(_fileSystem.FileExists(_fileName)))
            {
                _list = new List<T>();
            }
            else
            {
                var content = _fileSystem.ReadAllText(_fileName);
                _list = JsonConvert.DeserializeObject<List<T>>(content);
                if (_list == null)
                {
                    _list = new List<T>();
                }
            }
        }
        private async Task LoadListAsync()
        {
            if (string.IsNullOrEmpty(_fileName))
            {
                throw new ArgumentNullException("fileName", "The file name cannot be empty.");
            }
            if (!(_fileSystem.FileExists(_fileName)))
            {
                _list = new List<T>();
            }
            else
            {
                var content = await _fileSystem.ReadAllTextAsync(_fileName);
                _list = JsonConvert.DeserializeObject<List<T>>(content);
                if (_list == null)
                {
                    _list = new List<T>();
                }
            }
        }

        private void SaveList()
        {
            var content = JsonConvert.SerializeObject(_list);
            _fileSystem.WriteAllText(_fileName, content);
        }
        private async Task SaveListAsync()
        {
            var content = JsonConvert.SerializeObject(_list);
            await _fileSystem.WriteAllTextAsync(_fileName, content);
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public PageData<T> FilterPage(Expression<Func<T, bool>> predicate, PageInfo pageInfo)
        {
            throw new NotImplementedException();
        }

        public Task<PageData<T>> FilterPageAsync(Expression<Func<T, bool>> predicate, PageInfo pageInfo)
        {
            throw new NotImplementedException();
        }

        public int GetCount(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> FilterByCondition(IFilterValue condition)
        {
            throw new NotImplementedException();
        }

        public PageData<T> FilterByConditionPage(IFilterValue condition, PageInfo pageInfo)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> FilterByConditionAsync(IFilterValue condition)
        {
            throw new NotImplementedException();
        }

        public async Task<PageData<T>> FilterByConditionPageAsync(IFilterValue condition, PageInfo pageInfo)
        {
            await LoadListAsync();
            IEnumerable<T> list;
            var skip = (pageInfo.PageIndex - 1) * pageInfo.PageSize;
            if (condition != null)
            {
                var expr = await condition.ToLambdaFuncAsync<T>();
                list = _list.Where(expr);
            }
            else
            {
                list = _list;
            }
            var pageData = new PageData<T>()
            {
                List = list.Skip(skip).Take(pageInfo.PageSize),
                PageIndex = pageInfo.PageIndex,
                PageSize = pageInfo.PageSize,
                RecordCount = list.Count()
            };
            return pageData;
        }

        public int GetCountByCondition(IFilterValue condition)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountByConditionAsync(IFilterValue condition)
        {
            throw new NotImplementedException();
        }

        #endregion

    }

}
