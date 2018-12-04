using System.Collections.Generic;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API
{
    public class seeding
    {
        private readonly DataContext _context;

        public seeding(DataContext context)
        {
            _context = context;
        }

        public void seedUsers() {

            var userData = System.IO.File.ReadAllText("Data/seedUser.json");
            var Users = JsonConvert.DeserializeObject<List<User>>(userData);

            foreach (var user in Users)
            {
                byte[] passwordhash, passwordsalt;

                CreatePasswordHash("password" , out passwordhash, out passwordsalt);

                user.PasswordHash=passwordhash;
                user.PasswordSalt=passwordsalt;
                user.Username=user.Username.ToLower();
                _context.Users.Add(user);
            }
            _context.SaveChanges();

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        
    }
}