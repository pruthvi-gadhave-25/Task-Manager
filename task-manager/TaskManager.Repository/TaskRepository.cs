using Microsoft.EntityFrameworkCore;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskContext _context;

        public TaskRepository(TaskContext taskContext)
        {
            _context = taskContext;
        }

        public async Task<Project> GetTask(string id)
        {
            var task = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            if (task != null)
            {
                return task;
            }
            else
            {
                return new Project() { };
            }
        }

        public async Task<string> GetTaskId(string taskTitle)
        {
            var task = await _context.Projects.FirstOrDefaultAsync(p => p.TaskTitle == taskTitle);
            return task.Id;
        }
        public async Task<bool> CreateTask(Project project)
        {
            try
            {
                var entityEntry = await _context.Projects.AddAsync(project);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateTask(Project project)
        {
            var projectToDel = await _context.Projects.FirstOrDefaultAsync(p => p.Id == project.Id);
            if (projectToDel != null)
            {
                _context.Projects.Remove(projectToDel);
                _context.Projects.Add(project);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteTask(string id)
        {
            var projectToDel = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            if (projectToDel != null)
            {
                _context.Projects.Remove(projectToDel);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Project> GetAllTasks()
        {
            var projects = _context.Projects
                .ToList();

            return projects;
        }
    }
}