using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Repository
{
    public class TaskLogRepository : ITaskLog
    {
        private readonly TaskContext _taskContext;

        public TaskLogRepository(TaskContext taskContext)
        {
            _taskContext = taskContext;
        }

        public async Task CreateTaskLog(TaskLog taskLog)
        {
            try
            {
                var entityEntry = await _taskContext.Logs.AddAsync(taskLog);
                await _taskContext.SaveChangesAsync();
            }
            catch (Exception)
            {
            }
        }

        public async Task<TaskLog> GetTaskLog(string id)
        {
            return _taskContext.Logs.FirstOrDefault(l => l.Id == id);
        }

        public List<TaskLog> GetAllTaskLogs()
        {
            return _taskContext.Logs.ToList();
        }
    }
}