namespace salary.DataAccess.Entities
{
    public class TableEntity
    {
        public Guid id { get; set; }
        public Guid employee { get; set; }
        public decimal year { get; set; }
        public decimal month { get; set; }
        public decimal day { get; set; }
        public string status { get; set; }


    }

}
