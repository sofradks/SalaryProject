using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salary.Core.Models
{
    public class Position
    {
        public const int maxNameLength = 50;
        public Position(Guid id, string name, decimal hours, decimal salary)
        {
            ID = id;
            Name = name;
            Hours = hours;
            Salary = salary;
        }

        public Guid ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Hours { get; set; } 
        public decimal Salary { get; set; }

        public static (Position Position, string Error) Create(Guid id, string name, decimal hours, decimal salary)
        {
            var error = string.Empty;

            if (string.IsNullOrEmpty(name) || name.Length > maxNameLength)
            {
                error = "Наименование не может быть пустым или длиннее 30 символов";
            }


            var position = new Position(id, name, hours, salary);

            return (position,error);
        }
    }


}
