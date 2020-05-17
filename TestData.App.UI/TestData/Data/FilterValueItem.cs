using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{
    public class FilterValueItem : IFilterValue
    // When using it in WebApi, pass the class, not the interface because System.Text.Json doesn't support polymorphic serialization yet
    {

        public string Key { get; set; }
        public bool IsGroup { get; set; }
        /// <summary>
        /// Group only.
        /// </summary>
        public BinaryOperator BinaryOperator { get; set; }
        /// <summary>
        /// Group only.
        /// </summary>
        public ICollection<FilterValueItem> Items { get; set; } = new List<FilterValueItem>();
        /*
        public class FakeItem
        {
            public string ToSqlString(bool useParameter = false) { return ""; }
            public string ToLambdaString(string paramName = "p", bool isRoot = false) { return ""; }
            public IDictionary<string, object> GetSqlParameters() { return new Dictionary<string, object>(); }
        }
        public List<FakeItem> Items { get; set; } = new List<FakeItem>();
        */

        public FilterField Field { get; set;  }
        public ComparisonOperator ComparisonOperator { get; set; }
        public bool Negate { get; set; }
        // The Value1 and Value2 properties should be object, but System.Text.Json.JsonElement is dumb 
        //  and the conversion of JsonElements from generic objects to primitive types is expensive;
        //  use string as workaround
        public /*object*/ string Value1 { get; set; }
        public /*object*/ string Value2 { get; set; } // for ComparisonOperator.Between

        public string ToSqlString(bool useParameter = false)
        {
            if(IsGroup)
            {
                return ToSqlStringGroup(useParameter);
            }
            else
            {
                return ToSqlStringItem(useParameter);
            }
        }

        public void FixJsonValues()
        {
            if(IsGroup)
            {
                FixJsonValuesGroup();
            }
            else
            {
                FixJsonValuesItem();
            }
        }

        public string ToLambdaString(string paramName = "p", bool isRoot = false)
        {
            if (IsGroup)
            {
                return ToLambdaStringGroup(paramName, isRoot);
            }
            else
            {
                return ToLambdaStringItem(paramName, false);
            }
        }

        public Func<T, bool> ToLambdaFunc<T>(string paramName = "p")
        {
            var s = ToLambdaString(paramName, true);
            var expr = CSharpScript.EvaluateAsync<Func<T, bool>>(s,
                ScriptOptions.Default.WithReferences(typeof(string).Assembly)
                    .WithReferences(typeof(T).Assembly)
                    .WithImports("System")).GetAwaiter().GetResult();
            return expr;
        }

        public async Task<Func<T, bool>> ToLambdaFuncAsync<T>(string paramName = "p")
        {
            var s = ToLambdaString(paramName, true);
            var expr = await CSharpScript.EvaluateAsync<Func<T, bool>>(s,
                ScriptOptions.Default.WithReferences(typeof(string).Assembly)
                    .WithReferences(typeof(T).Assembly)
                    .WithImports("System"));
            return expr;
        }

        public IDictionary<string, object> GetSqlParameters()
        {
            if (IsGroup)
            {
                return GetSqlParametersGroup();
            }
            else
            {
                return GetSqlParametersItem();
            }
        }

        private string ToSqlStringItem(bool useParameter = false)
        {
            if (Field == null || string.IsNullOrEmpty(Field.Name)) return string.Empty;
            var columnName = Field.Name;
            string target = string.Empty;
            // use field name for parameters, to avoid column with same name, but different sources
            if (Value1 != null)
                target = (useParameter ? "@" + Field.Name : QuoteValue(Value1.ToString(), Value1.GetType().FullName, "'"));
            else
                target = "@" + Field.Name;

            switch (ComparisonOperator)
            {
                case ComparisonOperator.Contains:
                    target = "'%' + " + target + " + '%'";
                    break;
                case ComparisonOperator.StartsWith:
                    target = target + " + '%'";
                    break;
                case ComparisonOperator.EndsWith:
                    target = "'%' + " + target;
                    break;
                case ComparisonOperator.Between:
                    if (Value2 != null)
                        target = $"{target} AND " + (useParameter ? "@" + $"{Field.Name}2" : QuoteValue(Value2.ToString(), Value2.GetType().FullName, "'"));
                    else
                        target = $"{target} AND @{Field.Name}2";
                    break;
                default:
                    break;
            }
            var sqlString = (Negate ? "NOT(" : "") + $"[{columnName}]" + " " + GetComparisonOperatorSql(ComparisonOperator) + " " + target + (Negate ? ")" : "");
            return sqlString;
        }
        private string ToSqlStringGroup(bool useParameter = false)
        {
            if (!Items.Any()) return string.Empty;
            var sqlString = "(";
            foreach (var item in Items)
            {
                if (sqlString == "(")
                {
                    sqlString += $"{item.ToSqlString(useParameter) }";
                }
                else
                {
                    string sOp = BinaryOperator == BinaryOperator.Or ? "OR" : "AND";
                    sqlString = $"{sqlString} {sOp} {item.ToSqlString(useParameter) }";
                }
            }
            sqlString += ")";
            return sqlString;
        }

        private string ToLambdaStringItem(string paramName = "p", bool isRoot = false)
        {
            string target = string.Empty;
            target = QuoteValue(Value1?.ToString(), Value1?.GetType().FullName, "\"");
            switch(Field.FieldType)
            {
                case FieldType.Date:
                    target = $"DateTime.Parse({target})";
                    break;
            }
            var sqlString = string.Empty;
            switch (ComparisonOperator)
            {
                case ComparisonOperator.Contains:
                    target = ".Contains(" + target + ")";
                    sqlString = (Negate ? "!(" : "") + $"({paramName}.{Field.Name} != null && {paramName}.{Field.Name}{target})" + (Negate ? ")" : "");
                    break;
                case ComparisonOperator.StartsWith:
                    target = ".StartsWith(" + target + ")";
                    sqlString = (Negate ? "!(" : "") + $"({paramName}.{Field.Name} != null && {paramName}.{Field.Name}{target})" + (Negate ? ")" : "");
                    break;
                case ComparisonOperator.EndsWith:
                    target = ".EndsWith(" + target + ")";
                    sqlString = (Negate ? "!(" : "") + $"({paramName}.{Field.Name} != null && {paramName}.{Field.Name}{target})" + (Negate ? ")" : "");
                    break;
                case ComparisonOperator.Between:
                    var target2 = QuoteValue(Value2?.ToString(), Value2?.GetType().FullName, "\"");
                    switch (Field.FieldType)
                    {
                        case FieldType.Date:
                            target2 = $"DateTime.Parse({target2})";
                            break;
                    }
                    var part1 = $"{paramName}.{Field.Name} >= {target}";
                    var part2 = $"{paramName}.{Field.Name} <= {target2}";
                    sqlString = (Negate ? "!(" : "") + $"{part1} && {part2}" + (Negate ? ")" : "");
                    break;
                default:
                    sqlString = (Negate ? "!(" : "") + $"{paramName}.{Field.Name} {GetComparisonOperatorCSharp(ComparisonOperator)} {target}" + (Negate ? ")" : "");
                    break;
            }
            return sqlString;
        }
        private string ToLambdaStringGroup(string paramName = "p", bool isRoot = false)
        {
            if (!Items.Any()) return string.Empty;
            var sqlString = "(";
            foreach (var item in Items)
            {
                if (sqlString == "(")
                {
                    sqlString += $"{item.ToLambdaString(paramName, false) }";
                }
                else
                {
                    string sOp = BinaryOperator == BinaryOperator.Or ? "||" : "&&";
                    sqlString = $"{sqlString} {sOp} {item.ToLambdaString(paramName, false) }";
                }
            }
            sqlString += ")";
            return isRoot ? $"{paramName} => {sqlString}" : sqlString;
        }

        private IDictionary<string, object> GetSqlParametersItem()
        {
            var dict = new Dictionary<string, object>()
            {
                { $"@{Field.Name}", Value1 }
            };
            if(ComparisonOperator == ComparisonOperator.Between)
            {
                dict.Add($"@{Field.Name}2", Value2);
            }
            return dict;
        }

        private IDictionary<string, object> GetSqlParametersGroup()
        {
            var dict = new Dictionary<string, object>();
            foreach (var item in Items)
            {
                foreach (var p in item.GetSqlParameters())
                {
                    if (!dict.ContainsKey(p.Key))
                    {
                        dict.Add(p.Key, p.Value);
                    }
                }
            }
            return dict;
        }

        private void FixJsonValuesItem()
        {
            // Value1 and Value2 changed to strings
            //if (Value1 is JsonElement)
            //{
            //    var v = ((JsonElement)Value1).GetJsonValue();
            //    Value1 = v;
            //}
            //if (Value2 is JsonElement)
            //{
            //    var v = ((JsonElement)Value2).GetJsonValue();
            //    Value2 = v;
            //}
        }

        private void FixJsonValuesGroup()
        {
            foreach(var item in Items)
            {
                item.FixJsonValues();
            }
        }

        public static string GetComparisonOperatorCSharp(ComparisonOperator op)
        {
            string eOp = string.Empty;
            switch (op)
            {
                case ComparisonOperator.Equal:
                    eOp = "==";
                    break;
                case ComparisonOperator.NotEqual:
                    eOp = "!=";
                    break;
                case ComparisonOperator.LessThan:
                    eOp = "<";
                    break;
                case ComparisonOperator.LessOrEqualThan:
                    eOp = "<=";
                    break;
                case ComparisonOperator.GreaterThan:
                    eOp = ">";
                    break;
                case ComparisonOperator.GreaterOrEqualThan:
                    eOp = ">=";
                    break;
                case ComparisonOperator.IsNull:
                    eOp = "== null";
                    break;
                case ComparisonOperator.IsNotNull:
                    eOp = "!= null";
                    break;
                case ComparisonOperator.Contains:
                    eOp = "LIKE"; // TODO: implement
                    break;
                default:
                    break;
            }
            return eOp;
        }

        public static string GetComparisonOperatorSql(ComparisonOperator op)
        {
            string eOp = string.Empty;
            switch (op)
            {
                case ComparisonOperator.Equal:
                    eOp = "=";
                    break;
                case ComparisonOperator.NotEqual:
                    eOp = "<>";
                    break;
                case ComparisonOperator.LessThan:
                    eOp = "<";
                    break;
                case ComparisonOperator.LessOrEqualThan:
                    eOp = "<=";
                    break;
                case ComparisonOperator.GreaterThan:
                    eOp = ">";
                    break;
                case ComparisonOperator.GreaterOrEqualThan:
                    eOp = ">=";
                    break;
                case ComparisonOperator.IsNull:
                    eOp = "IS NULL";
                    break;
                case ComparisonOperator.Contains:
                case ComparisonOperator.StartsWith:
                case ComparisonOperator.EndsWith:
                    eOp = "LIKE";
                    break;
                case ComparisonOperator.Between:
                    eOp = "BETWEEN";
                    break;
                default:
                    break;
            }
            return eOp;
        }
        public static string QuoteValue(string value, string typeName, string quote)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrEmpty(typeName)) return string.Empty;
            string qValue = value;
            string t = typeName;
            if (t == null) t = string.Empty;
            switch (t.ToUpper())
            {
                case "":
                    qValue = quote + qValue + quote;
                    break;
                case "SYSTEM.STRING":
                    qValue = quote + qValue + quote;
                    break;
                case "SYSTEM.DATETIME":
                    qValue = quote + qValue + quote;
                    break;
                default:
                    break;
            }
            return qValue;
        }

    }
}
