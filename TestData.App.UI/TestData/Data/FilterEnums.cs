using System;
using System.Collections.Generic;
using System.Text;

namespace TestData.App.UI.TestData.Data
{

    public enum ComparisonOperator
    {
        Equal = 0,
        GreaterThan = 1,
        GreaterOrEqualThan = 2,
        LessThan = 3,
        LessOrEqualThan = 4,
        Between = 5,
        IsNull = 6,
        Contains = 7,
        NotEqual = 8,
        StartsWith = 9,
        EndsWith = 10,
        IsNotNull = 12
    }

    public enum BinaryOperator
    {
        None = 0,
        And = 1,
        Or = 2
    }
    public enum FieldType
    {
        None = 0,
        String = 1,
        Int = 2,
        Boolean = 3,
        Date = 4,
        Byte = 5,
        Guid = 6,
        Long = 7,
        Decimal = 8,
        Short = 9,
        Float = 10,
        Double = 11
    }
}
