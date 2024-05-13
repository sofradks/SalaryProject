using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using salary.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salary.DataAccess.Configurations
{
    public class PositionConfiguration : IEntityTypeConfiguration<PositionConfiguration>
    {
        public void Configure(EntityTypeBuilder<PositionEntity> builder)
        {
            builder.HasKey(x => x.id);

            builder.Property(n => n.name).HasMaxLength(30).IsRequired();

            builder.Property(h => h.hours).IsRequired();

            builder.Property(s => s.salary).IsRequired();
        }

        public void Configure(EntityTypeBuilder<PositionConfiguration> builder)
        {
            throw new NotImplementedException();
        }
    }
}
