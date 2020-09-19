using System.Collections.Generic;
using Learning.PartialFields.API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Learning.PartialFields.API.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private IEnumerable<User> Users = JsonConvert.DeserializeObject<IEnumerable<User>>(System.IO.File.ReadAllText("Resources/users.json"));

        [HttpGet]
        public IEnumerable<User> Search()
        {
            return Users;
        }
    }
}
