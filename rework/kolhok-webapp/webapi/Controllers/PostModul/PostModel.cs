using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Controllers.PostModul
{
    public class PostModel
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string PostId { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("author")]
        public string Author { get; set; }
        [BsonElement("text")]
        public string Text { get; set; }
        [BsonElement("tags")]
        public List<string> Tags { get; set; }
        [BsonElement("isPinned")]
        public bool IsPinned { get; set; }
        [BsonElement("isHidden")]
        public bool IsHidden { get; set; }
        [BsonElement("publicationDate")]
        public DateTime PublicationDate { get; set; }
        [BsonElement("lastEditDate")]
        public DateTime LastEditDate { get; set; }
        [BsonElement("files")]
        public List<string> AttachedFiles { get; set; }
    }
}
