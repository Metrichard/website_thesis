namespace webapi.Authentication.Model
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserLoginResponse
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string jwtToken { get; set;}
    }
}
