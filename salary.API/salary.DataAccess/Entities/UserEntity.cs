namespace salary.DataAccess.Entities
{
    public class UserEntity
    {
        public Guid id { get; set; }
        public string login { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }

}
