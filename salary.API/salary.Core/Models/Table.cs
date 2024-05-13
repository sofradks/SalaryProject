namespace salary.Core.Models
{
    public class Table
    {
        public Table(Guid id, Guid employeeGuid, decimal year, decimal month, decimal day, string status)
        {
            ID = id;
            EmployeeGuid = employeeGuid;
            Year= year;
            Month= month;
            Day= day;
            Status= status;
        }

        public Guid ID { get; set; }
        public Guid EmployeeGuid { get; set; } 
        public string EmployeeString { get; set; }
        public decimal Year { get; set; }
        public decimal Month { get; set; }
        public decimal Day { get; set; }
        public string Status { get; set; } = string.Empty;


    }


}
