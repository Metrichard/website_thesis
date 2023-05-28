using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers.TagModul
{
    [Route("api/")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly TagService _tagService;

        public TagController(TagService tagService) 
        {
            _tagService = tagService;
        }

        [HttpGet("tags")]
        public async Task<List<TagModel>> GetAllTags()
        {
            return await _tagService.GetAsync();
        }

        [HttpPost("tag-create")]
        public async Task CreateTag([FromBody] TagModel newTag)
        {
            await _tagService.CreateAsync(newTag);
            Ok("New tag created successfully");
        }

        [HttpDelete("tag-delete/{id}")]
        public async Task DeleteTag([FromRoute] string id)
        {
            await _tagService.RemoveAsync(id);
            Ok("Tag deleted successfully");
        }

    }
}
