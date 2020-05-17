using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using TestData.App.UI.TestData.Data;
using TestData.App.UI.TestData.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestData.App.UI.TestData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [ServiceFilter(typeof(ApiExceptionFilterAttribute))]
    public class CustomersController : ControllerBase
    {

        private readonly IDataQuery<Customer, string> qry;
        private readonly IDataCommand<Customer, string> cmd;

        public CustomersController(IDataQuery<Customer, string> qry, IDataCommand<Customer, string> cmd)
        {
            this.qry = qry;
            this.cmd = cmd;
        }

        [HttpGet]
        public async Task<ActionResult<Envelope<IEnumerable<Customer>>>> GetItems()
        {
            var list = await qry.GetAllAsync();
            var e = new Envelope<IEnumerable<Customer>>(list, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpPost("filters")]
        public async Task<ActionResult<Envelope<IEnumerable<Customer>>>> FilterPageItems([FromBody] FilterModel filterModel)
        {
            var list = await qry.FilterByConditionAsync(filterModel.Condition);
            var e = new Envelope<IEnumerable<Customer>>(list, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpPost("filters/{pageIndex}/{pageSize}")]
        public async Task<ActionResult<Envelope<PageData<Customer>>>> FilterPageItems(int pageIndex, int pageSize, [FromBody] FilterPageModel filterModel)
        {
            var pageInfo = new PageInfo() { PageIndex = pageIndex, PageSize = pageSize };
            PageData<Customer> pageData;
            if (!string.IsNullOrEmpty(filterModel.Search))
            {
                var condition = Customer.BuildSearchCondition(filterModel.Search);
                pageData = await qry.FilterByConditionPageAsync(condition, pageInfo);
            }
            else
            {
                pageData = await qry.FilterByConditionPageAsync(filterModel.Condition, pageInfo);
            }
            var e = new Envelope<PageData<Customer>>(pageData, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpGet("{id}", Name = "GetCustomer")]
        public async Task<ActionResult<Envelope<Customer>>> Get(string id)
        {
            var c = await qry.FindAsync(id);
            var e = new Envelope<Customer>(c, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpGet("default", Name = "GetNewCustomer")]
        public ActionResult<Envelope<Customer>> GetNew()
        {
            var c = new Customer()
            {
                Id = KeyGenerator.GetUniqueKey(6),
                Name = "New",
                Code = "",
                AccountNo = "001",
                CommencementDate = DateTime.Now,
                HasAccountCharge = true,
                HasDeliveryFees = true
            };
            var e = new Envelope<Customer>(c, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Customer item)
        {
            var c = await cmd.CreateAsync(item);
            var e = new Envelope<Customer>(c, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Customer item)
        {
            var c = await cmd.UpdateAsync(item);
            var e = new Envelope<Customer>(c, (int)HttpStatusCode.OK);
            return Ok(e);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, [FromBody] Customer item)
        {
            await cmd.DeleteAsync(item);
            var e = new Envelope<string>($"Customer {item.Name} has been deleted successfully.", (int)HttpStatusCode.OK);
            return Ok(e);
        }

    }
}
