using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Configurations
{
    public class PrivilegeConfiguration : IEntityTypeConfiguration<PrivilegeConfiguration>
    {
        public void Configure(EntityTypeBuilder<PrivilegeEntity> builder)
        {
            builder.HasKey(x => x.id);

            builder.Property(n => n.name).HasMaxLength(100).IsRequired();

            builder.Property(h => h.allowance).IsRequired();

        }

        public void Configure(EntityTypeBuilder<PrivilegeConfiguration> builder)
        {
            throw new NotImplementedException();
        }
    }
}
