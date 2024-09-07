using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class TaskLog
    {
        [Key]
        public string Id { get; set; } = null!;

        public string ProjectId { get; set; } = null!;

        public DateOnly Date { get; set; }

        public TimeSpan TimeSpent { get; set; }

        public string Note { get; set; } = null!;

        public Project Project { get; set; } = null!;
    }

}