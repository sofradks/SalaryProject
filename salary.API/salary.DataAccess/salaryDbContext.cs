using Microsoft.EntityFrameworkCore;
using salary.DataAccess.Entities;

namespace salary.DataAccess
{
    public class salaryDbContext: DbContext
    {
        public salaryDbContext(DbContextOptions<salaryDbContext> options) : base(options) 
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }
        public DbSet<PositionEntity> positions { get; set; }
        public DbSet<EmployeeEntity> employees { get; set; }
        public DbSet<TableEntity> table { get; set; }
        public DbSet<PrivilegeEntity> privileges { get; set; }
        public DbSet<SalaryEntity> salary { get; set; }
        public DbSet<UserEntity> users { get; set; }

    }
}