using salary.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salary.DataAccess.Entities
{
    public class PositionEntity
    {
        public Guid id { get; set; }
        public string name { get; set; } = string.Empty;
        public decimal hours { get; set; }
        public decimal salary { get; set; }
    }

}
