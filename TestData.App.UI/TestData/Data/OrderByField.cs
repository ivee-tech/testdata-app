using System;
using System.Collections.Generic;
using System.Text;

namespace TestData.App.UI.TestData.Data
{
    public class OrderByField
    {

        public OrderByField()
        {

        }
        public OrderByField(string name, SortType sortType)
        {
            Name = name;
            SortType = sortType;
        }

        public string Name { get; set; }
        public SortType SortType { get; set; }
    }
}
