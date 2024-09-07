/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { CreateTask } from './CreateTask';
import './TasksTable.css'
import './DisplayTask.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import Header from './Header';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


interface Project {
    id: string;
    number: string;
    taskTitle: string;
    assignedTo: string;
    priority: string;
    dueDate: string;
    completionPercentage: number;
    status: string;
    description: string;
}

interface DisplayTasksProps extends RouteComponentProps {
    getAllTasksFromDb : () => void ,
    isNewProjectAdd :boolean  ,
}

interface TaskHeaderState {
    showTask: boolean;
    showLog: boolean;
    tasksLoaded: boolean;
    currentId: string;
    isDisabled: boolean;
    tasks: Project[];
    editMode: boolean;
    formDataToEdit: Project;
}

class DisplayTask extends React.Component<DisplayTasksProps, TaskHeaderState>{
    tasks: Project[] = [];
    constructor(props: DisplayTasksProps) {
        super(props);
        this.state = {
            showTask: false,
            showLog: false,
            tasksLoaded: false,
            isDisabled: false,
            currentId: "",
            tasks: [],
            editMode: false,
            formDataToEdit: this.tasks[0],
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleLogClose = this.handleLogClose.bind(this);
        this.handleLogShow = this.handleLogShow.bind(this);
    }

    handleClose() {
        this.setState({ editMode: false });
        this.setState({ showTask: false, isDisabled: false });
    }

    handleShow() {
        this.setState({ showTask: true });
    }

    displayEditForm() {
        const Task = this.tasks.find(task => task.id === this.state.currentId) as Project;
        this.setState({ isDisabled: true });
        this.handleShow();
        this.setState({ formDataToEdit: Task, editMode: true })
    }

    handleLogClose() {
        this.setState({ showLog: false });
    }

    handleLogShow() {
        this.setState({ showLog: true });
    }

    disableOrEnable(): boolean {
        return this.state.isDisabled;
    }

    getPriority(priority: string) {
        return priority === 'High' ? `<div class='badge badge-pill p-2 table-font-size'><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" class="bi bi-caret-up-fill" viewBox="0 0 15 15">
  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
</svg> <span class='text-dark'>${priority}</span></div>` : `<div class='badge p-0 badge-pill table-font-size'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="green" class="bi bi-fast-forward-fill" viewBox="0 0 16 16">
  <g transform="rotate(90 8 8)">
    <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
    <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
  </g>
</svg>
 <span class='text-dark'>${priority}</span></div>`
    }

    getPriorityHTML() {
        return this.getTaskProperty(this.state.currentId, "priority") === 'High' ? <div className='badge badge-pill p-2 table-font-size red-pill'><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" className="bi bi-caret-up-fill" viewBox="0 0 15 15">
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg> <span className=''>{this.getTaskProperty(this.state.currentId, "priority")} Priority</span></div> : <div className='badge p-2 badge-pill table-font-size mr-1 green-pill'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="green" className="bi bi-fast-forward-fill" viewBox="0 0 16 16">
            <g transform="rotate(90 8 8)">
                <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" />
            </g>
        </svg>
            <span className=''>{this.getTaskProperty(this.state.currentId, "priority")} Priority</span></div>
    }

    clearTasks() {
        this.clearDisplay();
    }

    clearDisplay(): void {
        const table: HTMLElement | null = document.getElementById("taskSnapshotList");
        if (table) {
            table.innerHTML = "";
        }
    }

    async getAllTasks() {
        try {
            const response = await axios.get('https://localhost:7126/api/Task/GetAllTask');
            if (response && response.data) {
             
                this.tasks = response.data;
                this.clearTasks();
                this.tasks.forEach((project: Project) => {
                    this.createTasks(project);
                });

                this.setState({ tasksLoaded: true });
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    saveCurrentId(id: string): void {
        this.setState({ currentId: id });
    }

    setTaskActive(id: string) {
        const taskList = document.getElementById("taskSnapshotList") as HTMLUListElement;

        if (taskList) {
            const taskItems = taskList.querySelectorAll("li");

            for (const taskItem of taskItems) {
                if (taskItem.id === id) {
                    taskItem.classList.add("active-li");
                } else {
                    taskItem.classList.remove("active-li");
                }
            }
        }
    }

    setFirstTaskActive(id: string) {
        document.getElementById(id)?.classList.add("active-li");
    }

    displayCurrentTask(id: string) {
        this.setState({ currentId: id });
        this.setTaskActive(id);
        this.forceUpdate();
    }

    createTasks(task: Project): void {
        const list: HTMLElement | null = document.getElementById("taskSnapshotList");
        const li = document.createElement("li");
        li.setAttribute("class", "row");
        li.classList.add("task-list");
        li.setAttribute("id", `${task.id}`);
        li.addEventListener("click", () => this.displayCurrentTask(task.id));
        li.classList.add("border-bottom");
        li.classList.add("p-0");
        li.classList.add("m-0");
        li.classList.add("py-2");

        li.innerHTML = `<div class="col-sm-2">
        <input class="table-row-select" name="selectTask" type="checkbox" value="Yes" />
        </div>
        <div class="col-sm-10 p-0">
         <div>${task.taskTitle}</div>
         <div><img src="/src/Images/icons8-thick-vertical-line-24 orange.png" class="pipe-indicator mr-1" alt="pipe orange"></img>${task.status}</div>
            <div class="d-inline-block"><span class="border-right pr-1">Due Date: ${task.dueDate}</span></div>
            <div class="d-inline-block">${this.getPriority(task.priority)}</div>
        </div>`;

        list?.appendChild(li);
    }

    async componentDidMount() {
        const { location } = this.props;
        const searchParams = new URLSearchParams(location.search);
        const taskId = searchParams.get('Id');

        if (!this.state.tasksLoaded && taskId) {
            await this.getAllTasks();
            this.saveCurrentId(taskId);
            this.setState({ currentId: taskId });
            this.setFirstTaskActive(taskId);
            this.forceUpdate();
        }
    }

    getTaskProperty(id: string, Property: string): string {
        const Task = this.tasks.find(task => task.id === id);
        if (Task) {
            switch (Property) {
                case "id":
                    return Task.id;
                case "number":
                    return Task.number;
                case "taskTitle":
                    return Task.taskTitle;
                case "assignedTo":
                    return Task.assignedTo;
                case "dueDate":
                    return Task.dueDate;
                case "status":
                    return Task.status;
                case "priority":
                    return Task.priority;
                case "percentage":
                    return Task.completionPercentage.toString();
                case "description":
                    return Task.description;
            }
        }
        return "";
    }

    clearListDisplay(): void {
        const table: HTMLElement | null = document.getElementById("taskSnapshotList");
        if (table) {
            table.innerHTML = "";
        }
    }

    getCurrentTask() {
        const data = {
            Id: this.getTaskProperty(this.state.currentId, "id"),
            Number: parseInt(this.getTaskProperty(this.state.currentId, "number")),
            TaskTitle: this.getTaskProperty(this.state.currentId, "taskTitle"),
            AssignedTo: this.getTaskProperty(this.state.currentId, "assignedTo"),
            Priority: this.getTaskProperty(this.state.currentId, "priority"),
            DueDate: this.getTaskProperty(this.state.currentId, "dueDate"),
            CompletionPercentage: parseInt(this.getTaskProperty(this.state.currentId, "percentage")),
            Status: this.getTaskProperty(this.state.currentId, "status"),
            Description: this.getTaskProperty(this.state.currentId, "description"),
        };
        return data;
    }

    async handleDropdownChange(selectedStatus: string) {
        const data = this.getCurrentTask()
        data.Status = selectedStatus;
        try {
            const response = await axios.put('https://localhost:7126/api/Task/UpdateTask', data);
            console.log('Response:', response.data);
            this.clearListDisplay();
            await this.getAllTasks();// updating current task
            this.forceUpdate();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    getId(): string {
        return this.state.currentId;
    }

    async DeleteTask() {
        try {
            const Id = this.getId();
            const response = await axios.delete('https://localhost:7126/api/Task/RemoveTask/' + Id);
            console.log('Response:', response.data);
            this.clearListDisplay();
            await this.getAllTasks();// updating current task
            this.forceUpdate();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async CloneTask() {
        try {
            const data = this.getCurrentTask();
            data.Id = uuidv4();
            data.TaskTitle += "-copy";
            const response = await axios.post('https://localhost:7126/api/Task/CreateTask', data);
            console.log('Response:', response.data);
            this.clearDisplay();
            await this.getAllTasks();
            this.forceUpdate();
        } catch (error) {
            console.log(error);
        }
    }

    ModifyTask(operation: string) {
        switch (operation) {
            case "Edit":
                this.displayEditForm();
                break;
            case "Clone":
                this.CloneTask();
                break;
            case "Delete":
                this.DeleteTask();
                break;
        }
    }

    render() {
        return (
            <>
                <Header></Header>
                <div className="task-details-container">
                    <div className='task-list'>
                        <div className="d-flex justify-content-between margin-bottom">
                            <div className="task-header p-3"><h5>All Tasks</h5></div>
                            <div className="task-menu-options p-3">
                                <div className="btn-group">
                                    <button type="button" onClick={this.handleShow} className="btn rounded-left-lg btn-sm btn-secondary border-0 menu-link  text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg pb-1" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                        </svg> New
                                    </button>
                                    <button type="button" className="btn btn-sm border-0 rounded-right-lg margin-left  menu-link btn-secondary dropdown-toggle dropdown-toggle-split text-white" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="sr-only"></span>
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Edit</a>
                                        <a className="dropdown-item" href="#">Clone</a>
                                        <a className="dropdown-item" href="#">Delete</a>
                                    </div>

                                    <CreateTask handleShow={this.handleShow}
                                     handleClose={this.handleClose}
                                      disableForm={this.disableOrEnable()}
                                       show={this.state.showTask} 
                                       editMode={this.state.editMode} 
                                       formDataToEdit={this.state.formDataToEdit}
                                       getAllTasksFromDb ={this.props.getAllTasksFromDb}
                                       ></CreateTask>
                                </div>
                            </div>
                        </div>
                        <div className="all-tasks-list border-right">
                            <ul className="task-short-list m-0 p-0 list-unstyled" id="taskSnapshotList">

                            </ul>
                        </div>
                    </div>
                    <div className="task-details">
                        <div className="d-flex justify-content-between border-bottom">
                            <div className="task-header p-2">{this.getPriorityHTML()} </div>
                            <div className="task-menu-options p-2">
                                <div className="row p-0 m-0">
                                    <button onClick={this.handleLogShow} className="btn btn-sm menu-link text-white">
                                        Log Time
                                    </button>
                                    <div className="dropdown ml-1">
                                        <button className="btn  btn-sm dropdown-toggle  menu-link text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Change Status
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={() => this.handleDropdownChange('Completed')} href="#">Completed</a>
                                            <a className="dropdown-item" onClick={() => this.handleDropdownChange('Yet To Start')} href="#">Yet To Start</a>
                                            <a className="dropdown-item" onClick={() => this.handleDropdownChange('In Progress')} href="#">In Progress</a>
                                        </div>
                                    </div>
                                    <div className="dropdown ml-2">
                                        <button className="btn btn-sm p-0 " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <button type="button" className="btn btn-sm btn-secondary  btn-sm  rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                </svg>
                                            </button>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={() => this.ModifyTask('Edit')} href="#">Edit</a>
                                            <a className="dropdown-item" onClick={() => this.ModifyTask('Clone')} href="#">Clone</a>
                                            <a className="dropdown-item" onClick={() => this.ModifyTask('Delete')} href="#">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="task-details-body px-2">
                            <div className="task-header border-bottom row m-0 py-2 ">
                                <div className="task-number col-sm-6 pt-2"><h6><span className="text-muted">#TASK-{this.getTaskProperty(this.state.currentId, "number")}</span><span className="px-1">{this.getTaskProperty(this.state.currentId, "taskTitle")}</span><span className="badge badge-pil violet-pill text-white">{this.getTaskProperty(this.state.currentId, "status")}</span></h6></div>
                                <div className="task-progress col-sm-6 text-center">
                                    <div className="p-1 text-center">Percentage <span>{this.getTaskProperty(this.state.currentId, "percentage")}%</span></div>
                                    <div className='d-flex justify-content-center p-1'>
                                        <div className="progress" >
                                            <ProgressBar now={parseInt(this.getTaskProperty(this.state.currentId, "percentage"))} variant="success" className="bg-green" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='task-body border-bottom row m-0 py-2 mr-4'>
                                <div className="col-sm-4">
                                    <div className='due-date p-1'>Due Date</div>
                                    <div className="assigend Date p-1">Assigend Date</div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="due-date-value p-1">{this.getTaskProperty(this.state.currentId, "dueDate")}</div>
                                    <div className="assigned-date-value m-0 p-1">Unassigned</div>
                                </div>
                            </div>
                            <div className="task-time-sheet border-bottom row m-0 pt-2 pb-4 mr-4">
                                <div className="py-1"><b>TIMESHEETS</b></div>
                                <table>
                                    <thead className="table-header-style">
                                        <th>DATE</th><th>USER</th><th>TIME</th><th>STATUS</th>
                                    </thead>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(DisplayTask);