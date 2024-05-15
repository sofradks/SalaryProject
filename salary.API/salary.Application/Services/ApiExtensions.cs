using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salary.Application.Services
{
    public static class ApiExtensions
    {

        public static void AddApiAuthentication(IServiceCollection services)
        {
            string secretKey = "zhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendos";
            SymmetricSecurityKey IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var singningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256
                );

            var token = new JwtSecurityToken(
                //claims: claims,
                signingCredentials: singningCredentials
                );
            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.TokenValidationParameters = new()
                    {
                        ValidateIssuer = false,
                        ValidateAudience= false,
                        ValidateLifetime= false,
                        ValidateIssuerSigningKey= false,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                    };
                    options.Events = new JwtBearerEvents()
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["cookie"];

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(); 

        }
    }
}
