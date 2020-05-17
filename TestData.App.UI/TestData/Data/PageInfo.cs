using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace TestData.App.UI.TestData.Data
{
    public class PageInfo
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 50;
        public List<OrderByField> OrderByFields { get; set; } = new List<OrderByField>();

    }
}
