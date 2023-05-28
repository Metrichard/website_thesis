using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers.PageModul
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageDataController : ControllerBase
    {
        private readonly PageDataService _pageDataService;

        public PageDataController(PageDataService pageDataService)
        {
            _pageDataService = pageDataService;
        }

        [HttpGet("/api/page-data-get/{pageName}")]
        public async Task<PageDataModel> GetPageDataByName([FromRoute] string name)
        {
            return await _pageDataService.GetAsync(name);
        }

        [HttpPost("/api/page-data-create")]
        public async Task<IActionResult> CreatePageData([FromBody] PageDataRequest pageDataRequest)
        {
            PageDataModel model = new PageDataModel()
            {
                PageDataId = pageDataRequest.id,
                PageDataName = pageDataRequest.pageName,
                PageDataTitle = pageDataRequest.messageTitle,
                PageDataMessage = pageDataRequest.message,
                FileNames = pageDataRequest.fileNames
            };
            await _pageDataService.CreateAsync(model);
            return Ok("Page date created successfully");
        }

        [HttpPatch("/api/page-data-update")]
        public async Task<IActionResult> UpdatePageData([FromBody] PageDataRequest pageDataRequest)
        {
            PageDataModel model = new PageDataModel()
            {
                PageDataId = pageDataRequest.id,
                PageDataName = pageDataRequest.pageName,
                PageDataTitle = pageDataRequest.messageTitle,
                PageDataMessage = pageDataRequest.message,
                FileNames = pageDataRequest.fileNames
            };
            await _pageDataService.UpdateAsync(pageDataRequest.id, model);
            return Ok("PageData updated successfully");
        }

        [HttpDelete("/api/page-data-delete/{id}")]
        public async Task DeletePageDataById([FromRoute] string id)
        {
            await _pageDataService.RemoveAsync(id);
            Ok("Post deleted ssuccessfully");
        }
    }
}
