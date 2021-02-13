using System;
using System.Collections.Generic;
using System.Linq;
using Authentication.Exceptions;
using Authentication.Persistence;

namespace Authentication.Services
{
    public class PostService : IPostService
    {
        private readonly ApplicationDbContext _dbContext;

        public PostService(ApplicationDbContext dbContext) => _dbContext = dbContext;

        public Post Create(string title, string description, string userId)
        {
            var post = new Post
            {
                Id = Guid.NewGuid(),
                Title = title,
                Description = description,
                UserId = userId
            };

            _dbContext.Posts.Add(post);
            _dbContext.SaveChanges();

            return post;
        }

        public void Delete(Guid id, string userId)
        {
            var post = _dbContext.Posts.SingleOrDefault(p => p.Id == id);

            if (post == null)
                throw new NotFoundException(nameof(Post), id);

            var userOwnPost = post.UserId == userId;

            if (!userOwnPost)
                throw new ForbiddenException();

            _dbContext.Posts.Remove(post);
            _dbContext.SaveChanges();
        }

        public ICollection<Post> List() => _dbContext.Posts.ToList();
    }
}