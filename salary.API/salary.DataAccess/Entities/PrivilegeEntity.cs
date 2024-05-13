namespace salary.DataAccess.Entities
{
    public class PrivilegeEntity
    {
        public Guid id { get; set; }
        public string name { get; set; } = string.Empty;
        public decimal allowance { get; set; }
    }

}
