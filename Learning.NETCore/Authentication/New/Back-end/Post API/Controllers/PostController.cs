using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Post.Authentication;
using Post.Exceptions;
using Post.Persistence;

namespace Post.Controllers
{
    /// <summary>
    /// Must be logged to those endpoints.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IAuthenticationContext _authenticationContext;

        public Object HtttpContext { get; private set; }

        public PostController(ApplicationDbContext dbContext, IAuthenticationContext authenticationContext)
        {
            _dbContext = dbContext;
            _authenticationContext = authenticationContext;
        }

        [HttpGet]
        public IActionResult List() => Ok(_dbContext.Posts.ToList());

        [HttpPost]
        public IActionResult Create([FromBody] CreatePostRequest request)
        {
            var (title, description, userId) = (request.Title, request.Description, _authenticationContext.MyUser.Id);
            var post = new Persistence.Post
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

            var userOwnPost = post.UserId == _authenticationContext.MyUser.Id;

            if (!userOwnPost)
                throw new ForbiddenException();

            _dbContext.Posts.Remove(post);
            _dbContext.SaveChanges();

            return Ok();
        }
    }

    public class CreatePostRequest
    {
        [Required] public string Title { get; set; }
        [Required] public string Description { get; set; }
    }

}