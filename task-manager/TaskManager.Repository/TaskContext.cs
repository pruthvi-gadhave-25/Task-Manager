using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Repository
{
    public class TaskContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        public DbSet<TaskLog> Logs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                           "Data Source=MY_HP\\MSSQLSERVER01;Initial Catalog=TaskManager; Database=TaskManager ;Integrated Security=True;Encrypt=False;TrustServerCertificate=True",
                           b => b.MigrationsAssembly("TaskManager.Repository")
                       );
        }
    }
}