namespace webapi.Database.Configuration
{
    public class MongoDBSettings
    {
        public static string Settings = "MongoDb";

        public string? ConnectionString { get; set; } = null;
        public string? DatabaseName { get; set; } = null;
        public string? UserCollectionName { get; set; } = null;
        public string? PostsCollectionName { get; set; } = null;
        public string? TagsCollectionName { get; set; } = null;
        public string? PeopleCollectionName { get; set; } = null;
        public string? FiltersCollectionName { get; set; } = null;
        public string? FilesCollectionName { get; set; } = null;
        public string? DormsCollectionName { get; set; } = null;
        public string? DateEventCollectionName { get; set; } = null;
    }
}
