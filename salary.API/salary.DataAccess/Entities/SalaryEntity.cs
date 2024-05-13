namespace salary.DataAccess.Entities
{
    public class SalaryEntity
    {
        public Guid id { get; set; }
        public Guid employee { get; set; }
        public decimal year { get; set; }
        public decimal month { get; set; }
        public decimal hours { get; set; }
        public decimal summ { get; set; }


    }

}
