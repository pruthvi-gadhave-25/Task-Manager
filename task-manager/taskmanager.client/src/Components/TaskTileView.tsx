import { Component } from 'react';
import './TaskTileView.css';
import pipeOrange from '../Images/icons8-thick-vertical-line-24 orange.png';
import pipeBlue from '../Images/icons8-thick-vertical-line-24 blue.png';
import warning from '../Icons/warning.png';

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

interface TaskTileViewProps {
    tasks: Project[];
}

class TaskTileView extends Component<TaskTileViewProps> {

    getOverdueCount(): string {
        const { tasks } = this.props;
        const currentDate = new Date();
        tasks.length;
        const overdueCount = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);

            return dueDate.getDate() < currentDate.getDate();
        }).length;

        return overdueCount.toString();
    }

    getDueTodayCount(): number {
        const { tasks } = this.props;
        const currentDate = new Date()

        const dueToday = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate.getDate() === currentDate.getDate();
        }).length;

        return dueToday;
    }

    getPriorityToday(): number {
        const { tasks } = this.props;
        const priorityToday = tasks.filter(task => {
            return task.priority === 'High' || task.priority === 'Very High'
        }).length;

        return priorityToday;
    }

    getYetToStart(): number {
        const { tasks } = this.props;
        const unAssigned = tasks.filter(task => {
            return task.status === 'Yet To Start'
        }).length;
        return unAssigned;
    }

    getInProgress(): number {
        const { tasks } = this.props;
        const inProgress = tasks.filter(task => {
            return task.status === 'In Progress'
        }).length;
        return inProgress;
    }

    unAssigned(): number {
        const { tasks } = this.props;
        const assignedTo = tasks.filter(task => {
            return task.assignedTo === 'AssignedTo' || task.assignedTo === 'assignTo';
        }).length;
        return assignedTo;
    }

    render() {
        return (
            <div className="tile-container bg-light d-flex justify-content-between rounded-lg mx-3 py-3">
                <div className="task-progress">
                    <ul className='list-group list-group-horizontal list-unstyled'>
                        <li className='unassigned-count-section border-0  '>
                            <div className='d-flex align-items-center'>
                                <div className='p-2 mr-4 bg-white rounded'>
                                    <img src={warning} width={30} height={22} alt='warning'></img>
                                </div>
                                <div>
                                    <div className="overdue-count text-danger m-0" >{this.getOverdueCount()}</div>
                                    <div className='overdue-task-heading'>Overdue Tasks</div>
                                </div>
                            </div>
                        </li>
                        <li className='unassigned-count-section border-0'>
                            <h6 className=" m-0 pl-2 " >{this.getDueTodayCount()}</h6>
                            <img src={pipeOrange} className='pipe-indicator' alt='pipe orange'></img>
                            <div className='d-inline-flex task-details'>Due Today</div>

                        </li>
                        <li className='unassigned-count-section border-0'>
                            <h6 className=" m-0 pl-2" >{this.getPriorityToday()}</h6>
                            <img src={pipeOrange} className='pipe-indicator' alt='pipe orange'></img>
                            <div className='d-inline-flex task-details'>Priority Tody</div>
                        </li>
                        <li className='unassigned-count-section border-0'>
                            <h6 className=" m-0 pl-2" >{this.getYetToStart()}</h6>
                            <img src={pipeBlue} className='pipe-indicator' alt='pipe orange'></img>
                            <div className='d-inline-flex task-details'>Yet To Start</div>
                        </li>
                        <li className='unassigned-count-section border-0'>
                            <h6 className=" m-0 pl-2" >{this.getInProgress()}</h6>
                            <img src={pipeOrange} className='pipe-indicator' alt='pipe orange'></img>
                            <div className='d-inline-flex task-details'>In Progress</div>
                        </li>
                    </ul>
                </div>
                <div className="unassigned-count-section bg-white rounded-lg mr-3">
                    <h6 className="un-assigned-count text-center m-0 " >{this.unAssigned()}</h6>
                    <div className='fs-6 task-details'>Unassigned</div>
                </div>
            </div>
        )
    }
}

export default TaskTileView;