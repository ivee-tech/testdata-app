using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{
    public interface IFilterValue
    {
        string Key { get; set; }
        string ToSqlString(bool useParameter = false);
        string ToLambdaString(string paramName = "p", bool isRoot = false);
        Func<T, bool> ToLambdaFunc<T>(string paramName = "p");
        Task<Func<T, bool>> ToLambdaFuncAsync<T>(string paramName = "p");
        IDictionary<string, object> GetSqlParameters();
        /// <summary>
        /// Required to fix System.Text.Json.JsonElement limitation to convert to object
        /// </summary>
        void FixJsonValues();
    }
}
