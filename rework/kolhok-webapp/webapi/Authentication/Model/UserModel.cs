using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? UserID { get; set; }
    [BsonElement("displayName")]
    public string? DisplayName { get; set; }
    [BsonElement("username")]
    public string? Username { get; set; }
    [BsonElement("password")]
    public string? Password { get; set; }
    [BsonElement("email")]
    public string? Email { get; set; }
    [BsonElement("role")]
    public string? Role { get; set; }
}