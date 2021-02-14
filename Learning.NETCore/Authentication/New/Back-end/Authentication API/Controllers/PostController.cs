using System;
using System.Linq;
using Authentication.Exceptions;
using Authentication.Extensions;
using Authentication.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    /// <summary>
    /// Must be logged to those endpoints.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public Object HtttpContext { get; private set; }

        public PostController(ApplicationDbContext dbContext) => _dbContext = dbContext;

        [HttpGet]
        public IActionResult List() => Ok(_dbContext.Posts.ToList());

        [HttpPost]
        public IActionResult Create([FromBody] CreatePostRequest request)
        {
            var (title, description, userId) = (request.Title, request.Description, HttpContext.GetUserId());
            var post = new Post
            {
                Id = Guid.NewGuid(),
                Title = title,
                Description = description,
                UserId = userId
            };

            _dbContext.Posts.Add(post);
            _dbContext.SaveChanges();

            return Created(nameof(Create), post);
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            var post = _dbContext.Posts.SingleOrDefault(p => p.Id == id);

            if (post == null)
                throw new NotFoundException(nameof(Post), id);

            var userOwnPost = post.UserId == HttpContext.GetUserId();

            if (!userOwnPost)
                throw new ForbiddenException();

            _dbContext.Posts.Remove(post);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}