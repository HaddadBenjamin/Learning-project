using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PostController : ControllerBase
    {
        // Todo : simple rest api & endpoints (without ddd in a firist time)
        [HttpGet]
        public string Get() => "you have access";
    }

    // i'll continue this part a bit later, in a first time i'll have to check if my register & login endpoints work correectly
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public Guid UserId { get; set; }
        // to do : foreign key
        public IdentityUser User { get; set; }
        // link data to a user
    }
}
