import { ChangeEvent, Component } from "react";
import './TasksTable.css';
import filtericon from '../Icons/icons8-filter-50.png';
import axios from "axios";
import TaskTileView from "./TaskTileView";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TasksHeader from "./TasksHeader";

interface Project {
    id: string;
    number: string;
    taskTitle: string;
    assignedTo: string;
    priority: string;
    dueDate: string;
    completionPercentage: number;
    status: string;
}

interface TasksTableState {
    tasksLoaded: boolean;
    projects: Project[] ,
    selectedTask: string ,
   

}

interface TaskTableProps extends RouteComponentProps {
    projects : Project [] ,
    getAllTasksFromDb : () => void ,
}

class TasksTable extends Component<TaskTableProps, TasksTableState> {
    projects: Project[] = [];
    filteredProjects: Project[] = [];

    constructor(props: TaskTableProps) {
        super(props);
        this.state = {
            tasksLoaded: false,
            projects: [],
            selectedTask: "",
            
        };

        this.filterByStatus = this.filterByStatus.bind(this);
        this.filterByPriority = this.filterByPriority.bind(this);
        this.displayPriorityFilteredTask = this.displayPriorityFilteredTask.bind(this);
        this.displayStatusFilteredTask = this.displayStatusFilteredTask.bind(this);
    }



    async getAllTasks() {
        try {
            const response = await axios.get('https://localhost:7126/api/Task/GetAllTask');
            if (response && response.data) {
                this.projects = response.data;
                this.clearTasks();
                this.projects.forEach((project: Project) => {
                    this.createUserDataList(project);
                });

                this.setState({ tasksLoaded: true });
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    async componentDidMount() {
        if (!this.state.tasksLoaded) {
            await this.getAllTasks();
            this.forceUpdate();
        }
    }

    getPriority(priority: string) {
        return priority === 'High' ? `<div class='badge badge-pill ml-3 red-pill table-font-size'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
</svg> <span class=''>${priority}</span></div>` : `<div class='badge badge-pill ml-3 green-pill table-font-size'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="green" class="bi bi-fast-forward-fill" viewBox="0 0 16 16">
  <g transform="rotate(90 8 8)">
    <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
    <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
  </g>
</svg>
 <span class=''>${priority}</span></div>`
    }

    handleRowClick = (formData: Project) => {
        const { history } = this.props;
        history.push({
            pathname: "/DisplayTask",
            search: `?Id=${formData.id}`,
            state: { formData },
        });
    };

    async DeleteTask(Id: string) {
        try {
            const response = await axios.delete('https://localhost:7126/api/Task/RemoveTask/' + Id);
            console.log('Response:', response.data);
            this.clearTasks();
            await this.getAllTasks();// updating current task
            this.forceUpdate();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async CloneTask(data: Project) {
        try {
            data.id = uuidv4();
            data.taskTitle += "-copy";
            const response = await axios.post('https://localhost:7126/api/Task/CreateTask', data);
            console.log('Response:', response.data);
            this.clearTasks();
            await this.getAllTasks();
            this.forceUpdate();
        } catch (error) {
            console.log(error);
        }
    }

    createUserDataList(formData: Project): void {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("class", "list-item p-2");
        tableRow.setAttribute("id", formData.id);

        const tableBody = document.getElementById("tableBodySection");

        // Function to handle row click
        const handleRowClick = () => {
            this.handleRowClick(formData);
        };

        tableRow.addEventListener("click", handleRowClick);

        tableRow.innerHTML = `
        <td class='overflow-ellipsis'>
            <div class='grid-container'>
                <input class="table-row-select" name="selectAll" type="checkbox" value="Yes" />
                <span class='text-left'>Task-${formData.number}</span>
            </div>
        </td>
        <td class='overflow-ellipsis'>${formData.taskTitle}</td>
        <td class='overflow-ellipsis'>${formData.assignedTo}</td>
        <td class='overflow-ellipsis text-left'>${this.getPriority(formData.priority)}</td>
        <td class='overflow-ellipsis'>${formData.dueDate}</td>
        <td class='overflow-ellipsis'>
            <div class='d-flex justify-content-center'>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width:${formData.completionPercentage}%" aria-valuenow="${formData.completionPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </td>
        <td class='overflow-ellipsis'>
            <div class='d-flex justify-content-center'>
                <img src='/src/Images/icons8-thick-vertical-line-24 orange.png' class='pipe-indicator mt-1 mr-1' alt='pipe orange' />
                <span>${formData.status}</span>
            </div>
        </td>
   `;

        // Function to handle checkbox click
        const handleCheckboxClick = (event: Event) => {
            // Prevent the click event from propagating to the row
            event.stopPropagation();
            const checkbox = event.target as HTMLInputElement;
            const closestRow = checkbox.closest("tr");

            if (closestRow) {
                const closestRowId = closestRow.getAttribute("id");

                if (closestRowId) {
                    this.handleSelectedRowId(closestRowId);
                }
            }
        };

        // Add click event listener to the checkbox
        const checkbox = tableRow.querySelector(".table-row-select");
        if (checkbox) {
            checkbox.addEventListener("click", handleCheckboxClick);
        }

        if (tableBody) {
            tableBody.appendChild(tableRow);
        }
    }

    // Function to handle selected row ID
    handleSelectedRowId = (rowId: string) => {
        this.setState({ selectedTask: rowId });
    };

    clearTasks() {
        this.clearDisplay();
        this.filteredProjects = [];
    }

    clearDisplay(): void {
        const table: HTMLElement | null = document.getElementById("tableBodySection");
        if (table) {
            table.innerHTML = "";
        }
    }

    displayStatusFilteredTask(selectedValue: string): void {
        this.clearTasks();
        this.filteredProjects = this.projects.filter(task => task.status.toLowerCase() === selectedValue.toLowerCase());
        this.filteredProjects.forEach((project: Project) => {
            this.createUserDataList(project);
        });
    }

    filterByStatus(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;

        switch (selectedValue) {
            case "Yet To Start":
                this.displayStatusFilteredTask(selectedValue);
                break;
            case "Completed":
                this.displayStatusFilteredTask(selectedValue);

                break;
            case "In Progress":
                this.displayStatusFilteredTask(selectedValue);
                break;
        }
    }

    displayPriorityFilteredTask(priority: string): void {
        this.clearDisplay();
        const filterdTask: Project[] = this.filteredProjects.filter(task => task.priority.toLowerCase() === priority.toLowerCase());
        if (this.filteredProjects.length > 0) {
            filterdTask.forEach((project: Project) => {
                this.createUserDataList(project);
            });
        } else {
            const filtedProjects: Project[] = this.projects.filter(task => task.priority.toLowerCase() === priority.toLowerCase());
            filtedProjects.forEach((project: Project) => {
                this.createUserDataList(project);
            });
        }
    }

    filterByPriority(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;

        switch (selectedValue) {
            case "High":
                this.displayPriorityFilteredTask(selectedValue);
                break;
            case "Very Low":
                this.displayPriorityFilteredTask(selectedValue);
                break;
        }
    }

    toggle(source: HTMLInputElement): void {
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox !== source) {
                checkbox.checked = source.checked;
            }
        });
    }

    render() {
        return (
            <>
                <TasksHeader   getAllTasksFromDb={this.props.getAllTasksFromDb} />
                {this.state.tasksLoaded ? (
                    <TaskTileView tasks={this.projects}
                      />
                ) : (
                    <div>Loading...</div>
                )}
                <div className="pt-3">
                    <div className="">
                        <div className="table-filters pb-2">
                            <div className="d-inline-block ml-3 py-2">
                                <img src={filtericon} className="icon-style mr-1" alt="filter icon" />
                                <span className="filter-heading border-end pr-2 border-right"><b>FILTERS:</b></span>
                            </div>
                            <select onChange={this.filterByStatus} className="d-inline-block form-control border-0 ml-4 table-font-size" name="Status" id="selectStatus" >
                                <option disabled>Select Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Yet To Start">Yet To Start</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                            <select onChange={this.filterByPriority} className="d-inline-block form-control border-0 ml-4 table-font-size" name="priority" id="selectPriority">
                                <option disabled>Select Priority</option>
                                <option value="Very Low">Very Low</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div id="TaskDetailsTable" className="user-contacts-table">
                            <table id="addressDetailsTable" className="table table-bordered border-0">
                                <thead className="">
                                    <tr className="border-0">
                                        <th className="text-center pl-4" scope="col">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="selectAll"
                                                onClick={(e) => this.toggle(e.currentTarget)}
                                                id="selectAll"
                                                value="selectAll"
                                            />
                                            <span className="pl-2">TASK NUMBER</span>
                                        </th>
                                        <th className="text-center" scope="col">TITLE</th>
                                        <th className="text-center" scope="col">ASSIGNED TO</th>
                                        <th className="text-center" scope="col">PRIORITY</th>
                                        <th className="text-center" scope="col">DUE DATE</th>
                                        <th className="text-center" scope="col">COMPLETION PERCENTAGE</th>
                                        <th className="text-center" id="actions" scope="col">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBodySection" className="overflow-auto"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(TasksTable);