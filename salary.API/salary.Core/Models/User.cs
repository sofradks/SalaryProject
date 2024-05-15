namespace salary.Core.Models
{
    public class User
    {
        public User(Guid id, string login, string passwordHash)
        {
            ID = id;
            Login= login;
            Password = passwordHash;
        }

        public Guid ID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }




    }

}
