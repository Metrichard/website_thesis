using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Database.Configuration;
using System.Linq;
using Microsoft.AspNetCore.Http.HttpResults;

namespace webapi.Controllers.PostModul
{
    public class PostService
    {
        private readonly IMongoCollection<PostModel> _postCollection;

        public PostService(IOptions<MongoDBSettings> dbSetting)
        {
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _postCollection = mongoDatabase.GetCollection<PostModel>(dbSetting.Value.PostsCollectionName);
        }

        public async Task<List<PostModel>> GetAsync() => await _postCollection.Find(_ => true).ToListAsync();

        public async Task<PostModel?> GetAsync(string id) => await _postCollection.Find(x => x.PostId == id).FirstOrDefaultAsync();

        public async Task CreateAsync(PostModel post) => await _postCollection.InsertOneAsync(post);

        public async Task UpdateAsync(string id, PostModel post)
        {
            PostModel? oldPost = await _postCollection.Find(x => x.PostId == id).FirstOrDefaultAsync();
            if (oldPost is not null)
            {
                _postCollection.DeleteOne(x => x.PostId == id);
                PostModel newPost = new PostModel()
                {
                    PostId = oldPost.PostId,
                    Title = post.Title,
                    Author = post.Author,
                    Text = post.Text,
                    Tags = post.Tags,
                    IsPinned = post.IsPinned,
                    IsHidden = post.IsHidden,
                    PublicationDate = post.PublicationDate,
                    LastEditDate = post.LastEditDate,
                    AttachedFiles = post.AttachedFiles
                };

                await _postCollection.InsertOneAsync(newPost);
            }
        }

        public async Task RemoveAsync(string id) => await _postCollection.DeleteOneAsync(x => x.PostId == id);

        public async Task<List<PostModel>> GetFilteredPostsAsync(string tag)
        {
            List<PostModel> filteredPosts = new List<PostModel>();
            List<PostModel> allPosts = await GetAsync();
            filteredPosts.AddRange(from post in allPosts
                                   where post.Tags.Contains(tag) && !post.IsHidden
                                   select post);
            return filteredPosts;
        }

        public async Task<PostModel?> GetPinnedPostAsync() => await _postCollection.Find(x => x.IsPinned && !x.IsHidden).FirstOrDefaultAsync();
    }
}
