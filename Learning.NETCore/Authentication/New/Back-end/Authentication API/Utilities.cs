using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Authentication.Exceptions;
using Microsoft.IdentityModel.Tokens;

namespace Authentication.Utilities
{
    public class TokenUtilities
    {
        private readonly TokenValidationParameters _tokenValidationParameters;

        public TokenUtilities(TokenValidationParameters tokenValidationParameters)
        {
            _tokenValidationParameters = new TokenValidationParameters
            {
                ValidateLifetime = false,
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = tokenValidationParameters.IssuerSigningKey,
            };
        }

        public void ValidateAccessToken(string token)
        {
            var tokenIsValid = false;

            try
            {
                new JwtSecurityTokenHandler().ValidateToken(token, _tokenValidationParameters, out var securityAccessToken);

                tokenIsValid = (securityAccessToken is JwtSecurityToken jwtSecurityToken) &&
                     jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
            }
            catch (Exception e) { }
            finally
            {
                if (!tokenIsValid)
                    throw new BadRequestException("The token is not valid");
            }
        }

        public ClaimsPrincipal GetTokenClaimsPrincipal(string accessToken) => new JwtSecurityTokenHandler().ValidateToken(accessToken, _tokenValidationParameters, out var _);

        public string GetUserId(string accessToken) =>
            GetTokenClaimsPrincipal(accessToken).Claims.Single(c => c.Type == "id").Value;
    }
}