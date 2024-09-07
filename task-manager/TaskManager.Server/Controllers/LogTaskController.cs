using Microsoft.AspNetCore.Mvc;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogTaskController : ControllerBase
    {
        private readonly ITaskLog _taskLog;

        public LogTaskController(ITaskLog taskLog)
        {
            _taskLog = taskLog;
        }

        [HttpGet("GetTaskLog/{id}")]
        public async Task<TaskLog> GetTaskLog(string id)
        {
            return await _taskLog.GetTaskLog(id);
        }

        [HttpGet("GetAllTaskLogs")]
        public List<TaskLog> GetTaskLogs()
        {
            return _taskLog.GetAllTaskLogs();
        }

        [HttpPost("CreateTaskLog")]
        public void Post(TaskLog taskLog)
        {
            _taskLog.CreateTaskLog(taskLog);
        }
    }
}