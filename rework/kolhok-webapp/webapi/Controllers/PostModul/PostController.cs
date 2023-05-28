using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

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
        public async Task<List<PostModel>> GetAllPostsBasedOnFilter([FromRoute] string tag)
        {
            return await _postService.GetFilteredPostsAsync(tag);
        }

        [HttpGet("post-pinned")]
        public async Task<PostModel?> GetPinnedPost()
        {
            return await _postService.GetPinnedPostAsync();
        }

        [HttpPost("post-create")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreatePost([FromBody] PostRequest newPost)
        {
            PostModel post = new PostModel() 
            {
                PostId = newPost.PostId,
                Title = newPost.Title,
                Author = newPost.Author,
                Text = newPost.Text,
                Tags = newPost.Tags,
                IsPinned = newPost.IsPinned,
                IsHidden = newPost.IsHidden,
                PublicationDate = newPost.PublicationDate,
                LastEditDate = newPost.LastEditDate,
                AttachedFiles = newPost.AttachedFiles,
            };
            await _postService.CreateAsync(post);
            return Ok("Post created successfully");
        }

        [HttpPatch("post-update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdatePost([FromBody] PostRequest newPost)
        {
            PostModel post = new()
            {
                PostId = newPost.PostId,
                Title = newPost.Title,
                Author = newPost.Author,
                Text = newPost.Text,
                Tags = newPost.Tags,
                IsPinned = newPost.IsPinned,
                IsHidden = newPost.IsHidden,
                PublicationDate = newPost.PublicationDate,
                LastEditDate = newPost.LastEditDate,
                AttachedFiles = newPost.AttachedFiles,
            };
            await _postService.UpdateAsync(post.PostId, post);
            return Ok("Post updated successfully");
        }

        [HttpGet("posts/{id}")]
        public async Task<PostModel?> GetPostById([FromRoute] string id)
        {
            return await _postService.GetAsync(id);
        }

        [HttpDelete("post-delete/{id}")]
        public async Task DeletePostById([FromRoute] string id)
        {
            await _postService.RemoveAsync(id);
            Ok("Post deleted successfully");
        }
    }
}
