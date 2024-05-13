namespace salary.DataAccess.Entities
{
    public class EmployeeEntity
    {
        public Guid id { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string patronymic { get; set; }
        public string snils { get; set; }
        public string pSeria { get; set; }
        public string pNumber { get; set; }
        public decimal rate { get; set; }
        public DateTime dateOfReceipt { get; set; }
        public DateTime dateOfDismissal { get; set; }
        public Guid position { get; set; }
        public List<Guid> privileges { get; set; }

    }
}
