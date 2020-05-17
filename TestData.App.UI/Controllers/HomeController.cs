using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;
using System.Security.Claims;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TestData.App.UI.Controllers
{
    public class HomeController : Controller
    {

        public HomeController()
        {
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
        }

        public IActionResult Index()
        {
            ViewData["Message"] = $"Sample TestData App";
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "About Ivee UI";
            return View();
        }

        public IActionResult App()
        {
            return Redirect($"~/app");
        }


        public IActionResult Error(string message)
        {
            ViewBag.Message = message;
            return View();
        }
    }
}
