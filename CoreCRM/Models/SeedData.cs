using System;
using System.Linq;
using System.Threading.Tasks;
using CoreCRM.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

namespace CoreCRM.Models
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();
            var dbContext = serviceProvider.GetService<ApplicationDbContext>();

            // Create the tables.
            dbContext.Database.EnsureCreated();

            // Look for any users.
            if (dbContext.Users.Any())
            {
                return; // DB has been seeded.
            }

            var profile = new Profile
            {

            };
            dbContext.Profiles.Add(profile);
            await dbContext.SaveChangesAsync();

            var user = new ApplicationUser()
            {
                ProfileID = profile.Id,
                UserName = "admin",
                Email = "admin@163.com"
            };

            try
            {
                var result = await userManager.CreateAsync(user, "admin");
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e}");
            }

            profile.AccountID = user.Id;
            dbContext.Update(profile);
            await dbContext.SaveChangesAsync();

            await roleManager.CreateAsync(new IdentityRole("Administrator"));
            await roleManager.CreateAsync(new IdentityRole("Employee"));

            await userManager.AddToRoleAsync(user, "Administrator");
        }
    }
}
