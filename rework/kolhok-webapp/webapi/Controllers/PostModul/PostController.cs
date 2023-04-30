using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers.PostModul
{
    [Route("api/")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpGet("posts")]
        public async Task<List<PostModel>> GetAll()
        {
            return await _postService.GetAsync();
        }

        [HttpGet("posts-w-tag/{tag}")]
        public async Task<List<PostModel>> GetAllPostsBasedOnFilter(string tag)
        {
            return await _postService.GetFilteredPostsAsync(tag);
        }

        [HttpGet("post-pinned")]
        public async Task<PostModel?> GetPinnedPost()
        {
            return await _postService.GetPinnedPostAsync();
        }

        [HttpPost("post-create")]
        public async Task CreatePost([FromBody] PostModel post)
        {
            await _postService.CreateAsync(post);
            Ok("Post created successfully");
        }

        [HttpPatch("post-update")]
        public async Task UpdatePost([FromQuery] PostModel post)
        {
            await _postService.UpdateAsync(post.PostId, post);
            Ok("Post updated successfully");
        }

        [HttpGet("posts/{id}")]
        public async Task<PostModel?> GetPostById(string id)
        {
            return await _postService.GetAsync(id);
        }

        [HttpDelete("post-delete/{id}")]
        public async Task DeletePostById(string id)
        {
            await _postService.RemoveAsync(id);
            Ok("Post deleted successfully");
        }
    }
}
