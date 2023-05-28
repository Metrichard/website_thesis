using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Controllers.PageModul
{
    public class PageDataModel
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        [BsonElement("postId")]
        public string PageDataId { get; set; }
        [BsonElement("pageName")]
        public string PageDataName { get; set; }
        [BsonElement("pageTitle")]
        public string PageDataTitle { get; set; }
        [BsonElement("pageMessage")]
        public string PageDataMessage { get; set;}
        [BsonElement("fileName")]
        public string[] FileNames { get; set; }
    }

    public class PageDataRequest
    {
        public string id { get; set; }
        public string pageName { get; set; }
        public string messageTitle { get; set; }
        public string message { get; set; }
        public string[] fileNames { get; set; }
    }
}
