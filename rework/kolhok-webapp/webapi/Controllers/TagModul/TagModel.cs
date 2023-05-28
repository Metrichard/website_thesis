using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Controllers.TagModul
{
    public class TagModel
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string TagId { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
    }
}
