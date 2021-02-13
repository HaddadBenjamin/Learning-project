using System;

namespace Authentication.Persistence.Entities
{
    public class RefreshToken
    {
        public string RefreshTokenValue { get; set; }
        public string JwtId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool Used { get; set; }
        /// <summary>
        /// A refresh token must be invalidated when the user password has been changed.
        /// </summary>
        public bool Invalidated{ get; set; }
      
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
