using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Controllers.PostModul;
using webapi.Database.Configuration;

namespace webapi.Controllers.PageModul
{
    public class PageDataService
    {
        private readonly IMongoCollection<PageDataModel> _pageDataCollection;

        public PageDataService(IOptions<MongoDBSettings> dbSetting)
        {
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _pageDataCollection = mongoDatabase.GetCollection<PageDataModel>(dbSetting.Value.PageDataCollectionName);
        }

        public async Task<List<PageDataModel>> GetAsync() => await _pageDataCollection.Find(_ => true).ToListAsync();

        public async Task<PageDataModel?> GetAsync(string name) => await _pageDataCollection.Find(x => x.PageDataName == name).FirstOrDefaultAsync();

        public async Task CreateAsync(PageDataModel pageData) => await _pageDataCollection.InsertOneAsync(pageData);

        public async Task UpdateAsync(string id, PageDataModel pageData)
        {
            PageDataModel? oldPageData = await _pageDataCollection.Find(x => x.PageDataId == id).FirstOrDefaultAsync();
            if (oldPageData is not null)
            {
                _pageDataCollection.DeleteOne(x => x.PageDataId == id);
                PageDataModel newPostData = new PageDataModel()
                {
                    PageDataId = id,
                    PageDataTitle = pageData.PageDataTitle,
                    PageDataName = pageData.PageDataName,
                    PageDataMessage = pageData.PageDataMessage,
                    FileNames = pageData.FileNames,
                };

                await _pageDataCollection.InsertOneAsync(newPostData);
            }
        }

        public async Task RemoveAsync(string id) => await _pageDataCollection.DeleteOneAsync(x => x.PageDataId == id);
    }
    
}
