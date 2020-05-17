using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace TestData.App.UI.TestData.Data
{
    public class ObjectBase<TKey>
        where TKey : IComparable
    {

        [Browsable(false)]
        public bool IsNew { get; set; }
        [Browsable(false)]
        public bool IsDirty { get; set; }
        [Browsable(false)]
        public bool IsDeleted { get; set; }
        public virtual TKey Key { get; set; }

        public virtual void SetNew()
        {
            Clean();
            IsNew = true;
        }

        public virtual void SetDirty()
        {
            Clean();
            IsDirty = true;
        }

        public virtual void SetDeleted()
        {
            Clean();
            IsDeleted = true;
        }

        public void Clean()
        {
            IsNew = IsDirty = IsDeleted = false;
        }

    }
}
