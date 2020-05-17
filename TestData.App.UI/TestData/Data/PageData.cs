using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TestData.App.UI.TestData.Data
{
    public class PageData<T>
    {

        public PageData()
        {
            List = new List<T>();
        }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int? RecordCount { get; set; }

        public int PageCount
        {
            get
            {
                if (!RecordCount.HasValue) return PageIndex;
                return (int)Math.Ceiling((decimal)RecordCount.Value / PageSize);
            }
        }

        public IEnumerable<T> List { get; set; }

        public PageData<object> ToPageDataObject()
        {
            var pageDataObj = new PageData<object>();
            pageDataObj.PageIndex = PageIndex;
            pageDataObj.PageSize = PageSize;
            pageDataObj.RecordCount = RecordCount;
            //var list = new List<object>();
            //foreach (var c in List)
            //{
            //    list.Add(c);
            //}
            pageDataObj.List = List.Cast<object>();
            return pageDataObj;
        }
    }
}
