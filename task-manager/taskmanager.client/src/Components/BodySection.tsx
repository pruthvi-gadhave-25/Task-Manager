import { Component } from 'react';
import Header from './Header';
import TasksTable from './TasksTable';
import './BodySection.css';
/*import DisplayTask from './DisplayTask';*/

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
interface BodySectionProps{
    projects : Project[] ,
    getAllTasksFromDb : () => void ,
}

class BodySection extends Component<BodySectionProps ,{}> {
    render() {
        return (
            <div className="body-container-style">
                <Header></Header>
                <TasksTable 
                 projects={this.props.projects}  
                 getAllTasksFromDb={this.props.getAllTasksFromDb}
                />
            </div>
        );
    }
}

export default BodySection;