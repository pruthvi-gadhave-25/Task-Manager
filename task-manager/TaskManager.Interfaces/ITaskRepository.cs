using TaskManager.Models;

namespace TaskManager.Interfaces
{
    public interface ITaskRepository
    {
        Task<Project> GetTask(string id);

        Task<bool> CreateTask(Project project);

        Task<bool> UpdateTask(Project project);

        Task<bool> DeleteTask(string id);

        List<Project> GetAllTasks();

        Task<string> GetTaskId(string taskTitle);

    }
}