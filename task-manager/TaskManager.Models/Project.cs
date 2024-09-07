namespace TaskManager.Models
{
    public class Project
    {
        public string Id { get; set; }
        public int Number { get; set; }
        public string TaskTitle { get; set; }
        public string AssignedTo { get; set; }
        public string Priority { get; set; }
        public DateOnly DueDate { get; set; }
        public int CompletionPercentage { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
    }
}