using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Configurations
{
    public class TableConfiguration : IEntityTypeConfiguration<TableConfiguration>
    {
        public void Configure(EntityTypeBuilder<TableEntity> builder)
        {
            builder.HasKey(x => x.id);

            builder.Property(n => n.year).IsRequired();

            builder.Property(h => h.month).IsRequired();

            builder.Property(s => s.day).IsRequired();

            builder.Property(s => s.status).HasMaxLength(3);

            builder.Property(s => s.employee).IsRequired();

        }

        public void Configure(EntityTypeBuilder<TableConfiguration> builder)
        {
            throw new NotImplementedException();
        }
    }
}
