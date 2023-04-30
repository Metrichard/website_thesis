using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Database.Configuration;

namespace webapi.Authentication.Service
{
    public class UserService
    {
        private readonly IMongoCollection<UserModel> _userCollection;

        public UserService(IOptions<MongoDBSettings> dbSetting)
        {
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _userCollection = mongoDatabase.GetCollection<UserModel>(dbSetting.Value.UserCollectionName);
        }

        public async Task<List<UserModel>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

        public async Task<UserModel?> GetAsync(string username) => await _userCollection.Find(x => x.Username == username).FirstOrDefaultAsync();

        public async Task CreateAsync(UserModel user) => await _userCollection.InsertOneAsync(user);

        public async Task UpdateAsync(string id, UserModel updatedUser) => await _userCollection.ReplaceOneAsync(x => x.UserID == id, updatedUser);

        public async Task RemoveAsync(string id) => await _userCollection.DeleteOneAsync(x => x.UserID == id);
    }
}
