using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Controllers.PostModul
{
    public class PostRequest
    {
        public string PostId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public List<string> Tags { get; set; }
        public bool IsPinned { get; set; }
        public bool IsHidden { get; set; }
        public DateTime PublicationDate { get; set; }
        public DateTime LastEditDate { get; set; }
        public List<string> AttachedFiles { get; set; }
    }
}
