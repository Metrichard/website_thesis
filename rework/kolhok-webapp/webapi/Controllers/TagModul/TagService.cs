using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Controllers.PostModul;
using webapi.Database.Configuration;

namespace webapi.Controllers.TagModul
{
    public class TagService
    {
        private readonly IMongoCollection<TagModel> _tagCollection;

        public TagService(IOptions<MongoDBSettings> dbSettings)
        {
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _tagCollection = mongoDatabase.GetCollection<TagModel>(dbSettings.Value.TagsCollectionName);
        }

        public async Task<List<TagModel>> GetAsync() => await _tagCollection.Find(_ => true).ToListAsync();

        public async Task CreateAsync(TagModel tag) => await _tagCollection.InsertOneAsync(tag);

        public async Task RemoveAsync(string id) => await _tagCollection.DeleteOneAsync(x => x.TagId == id);
    }
}
