using TaskManager.Models;

namespace TaskManager.Interfaces
{
    public interface ITaskLog
    {
        Task CreateTaskLog(TaskLog taskLog);

        Task<TaskLog> GetTaskLog(string id);

        List<TaskLog> GetAllTaskLogs();
    }
}