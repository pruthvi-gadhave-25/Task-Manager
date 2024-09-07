using Microsoft.AspNetCore.Mvc;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet("GetTask/{id}")]
        public async Task<Project> Get(string id)
        {
            return await _taskRepository.GetTask(id);
        }

        [HttpGet("GetTaskId/{taskTitle}")]
        public async Task<String> GetTaskId(string taskTitle)
        {
            return await _taskRepository.GetTaskId(taskTitle);
        }

        [HttpGet("GetAllTask")]
        public List<Project> GetAllTasks()
        {
            return _taskRepository.GetAllTasks();
        }

        [HttpPost("CreateTask")]
        public async Task<IActionResult> CreateTask(Project project)
        {
            try
            {
                bool created = await _taskRepository.CreateTask(project);

                if (created)
                {
                    return Ok();
                }
                else
                {
                    return NotFound($"Task with ID {project.Id} not created");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateTask")]
        public async Task<IActionResult> Put(Project project)
        {
            try
            {
                bool updated = await _taskRepository.UpdateTask(project);
                if (updated)
                {
                    return Ok();
                }
                else
                {
                    return NotFound($"Task with ID {project.Id} not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("RemoveTask/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                bool deleted = await _taskRepository.DeleteTask(id);

                if (deleted)
                {
                    return Ok();
                }
                else
                {
                    return NotFound($"Task with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}