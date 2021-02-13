using System;
using Authentication.Extensions;
using Authentication.Requests;
using Authentication.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService) => _postService = postService;

        [HttpGet]
        public IActionResult List() => Ok(_postService.List());

        [HttpPost]
        public IActionResult Create([FromBody] CreatePostRequest request) =>
            Created(nameof(Create), _postService.Create(request.Title, request.Description, HttpContext.GetUserId()));

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            _postService.Delete(id, HttpContext.GetUserId());

            return Ok();
        }
    }
}