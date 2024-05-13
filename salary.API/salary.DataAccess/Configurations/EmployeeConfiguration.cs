using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Configurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<EmployeeConfiguration>
    {
        public void Configure(EntityTypeBuilder<EmployeeEntity> builder)
        {
            builder.HasKey(x => x.id);

            builder.Property(n => n.surname).HasMaxLength(30).IsRequired();

            builder.Property(h => h.name).HasMaxLength(30).IsRequired();

            builder.Property(s => s.patronymic).HasMaxLength(50).IsRequired();

            builder.Property(s => s.snils).HasMaxLength(14).IsRequired();

            builder.Property(s => s.pSeria).HasMaxLength(4).IsRequired();

            builder.Property(s => s.pNumber).HasMaxLength(6).IsRequired();

            builder.Property(s => s.rate).IsRequired();
            builder.Property(s => s.dateOfReceipt).IsRequired();
            builder.Property(s => s.dateOfDismissal);
            builder.Property(s => s.position).IsRequired();
            builder.Property(s => s.privileges);
        }

        public void Configure(EntityTypeBuilder<EmployeeConfiguration> builder)
        {
            throw new NotImplementedException();
        }
    }
}
