using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Configurations
{
    public class SalaryConfiguration : IEntityTypeConfiguration<SalaryConfiguration>
    {
        public void Configure(EntityTypeBuilder<SalaryEntity> builder)
        {
            builder.HasKey(x => x.id);

            builder.Property(n => n.employee).IsRequired();

            builder.Property(h => h.year).IsRequired();

            builder.Property(s => s.month).IsRequired();

            builder.Property(s => s.hours);

            builder.Property(s => s.summ);

        }

        public void Configure(EntityTypeBuilder<SalaryConfiguration> builder)
        {
            throw new NotImplementedException();
        }
    }
}
