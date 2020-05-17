using System;
using System.Collections.Generic;
using System.Text;

namespace TestData.App.UI.TestData.Models
{
    public class Envelope<T>
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public Envelope()
        {
            Code = 0;
            Message = "";
            Data = default(T);
        }

        public Envelope(T data, int code, string message = null)
        {
            Data = data;
            Code = code;
            Message = message;
        }
    }
}
