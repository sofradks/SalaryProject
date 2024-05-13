namespace salary.Core.Models
{
    public class Privilege
    {
        public Privilege(Guid id, string name, decimal allowance)
        {
            ID = id;
            Name = name;
            Allowance = allowance;
        }

        public Guid ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Allowance { get; set; }

        
    }

}
