using System;
using System.Collections.Generic;
using Authentication.Persistence;
using Authentication.Persistence.Entities;

namespace Authentication.Services
{
    public interface IPostService
    {
        Post Create(string title, string description, string userId);

        void Delete(Guid id, string userId);

        ICollection<Post> List();
    }
}