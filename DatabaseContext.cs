using Microsoft.EntityFrameworkCore;
using ReactAPI.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactAPI
{
    public class DatabaseContext : DbContext
    {
        private string _connectionString;
        private string _migrationAssemblyName;

        public DatabaseContext(string connectionString, string migrationAssemblyName)
        {
            _connectionString = connectionString;
            _migrationAssemblyName = migrationAssemblyName;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            if (!dbContextOptionsBuilder.IsConfigured)
            {
                dbContextOptionsBuilder.UseSqlServer(
                    _connectionString,
                    m => m.MigrationsAssembly(_migrationAssemblyName));
            }

            base.OnConfiguring(dbContextOptionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Employee> employees { get; set; }
        
    }
}
