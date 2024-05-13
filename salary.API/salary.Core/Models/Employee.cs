using salary.Application.Services;
using salary.DataAccess.Repository;

namespace salary.Core.Models
{
    public class Employee
    {
        public Employee(Guid id, string surname, string name, string patronymic, string snils,
            string pSeria, string pNumber, decimal rate, DateTime dateOfReceipt,
            DateTime dateOfDismissal, Guid positionGuid, List<Guid> privilegesGuid)
        {
            ID= id;
            Surname= surname;
            Name = name;
            Patronymic= patronymic;
            Snils= snils;
            PSeria= pSeria;
            PNumber= pNumber;
            Rate= rate;
            DateOfReceipt= dateOfReceipt;
            DateOfDismissal= dateOfDismissal;
            PrivilegesGuid = privilegesGuid;
            PositionGuid = positionGuid;
        }

        public Guid ID { get; set; }
        public string Surname { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Patronymic { get; set; } = string.Empty;
        public string Snils { get; set; } = string.Empty;
        public string PSeria { get; set; } = string.Empty;
        public string PNumber { get; set; } = string.Empty;
        public decimal Rate { get; set; }
        public DateTime DateOfReceipt { get; set; }
        public DateTime DateOfDismissal { get; set; } 
        public Guid PositionGuid { get; set; }
        public string PositionString { get; set; } = string.Empty;
        public List<Guid> PrivilegesGuid { get; set; }
        public List<string> PrivilegesString { get; set; } = new List<string>();


    }


}
