namespace salary.Core.Models
{
    public class Salary
    {
        public Salary(Guid id, Guid employeeGuid, decimal year, decimal month, decimal hours, decimal summ)
        {
            ID = id;
            EmployeeGuid = employeeGuid;
            Year = year;
            Month = month;
            Summ = summ;
            Hours = hours;
        }

        public Guid ID { get; set; }
        public Guid EmployeeGuid { get; set; } 
        public string EmployeeString { get; set; }
        public decimal Year { get; set; }
        public decimal Month { get; set; }
        public decimal Hours { get; set; } = 0;
        public decimal Summ { get; set; }


    }

}
