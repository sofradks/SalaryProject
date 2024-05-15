using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using salary.DataAccess.Entities;

namespace salary.DataAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserConfiguration>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(x => x.id);

            builder.Property(n => n.login).HasMaxLength(30).IsRequired();
            builder.Property(n => n.login).HasMaxLength(30).IsRequired();

        }

        public void Configure(EntityTypeBuilder<UserConfiguration> builder)
        {
            throw new NotImplementedException();
        }
    }
}
