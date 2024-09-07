import { Component } from "react";
import { CreateTask } from './CreateTask';


interface TaskHeaderState {
    show: boolean;
}
interface TaskHederProps {
    getAllTasksFromDb : () => void ,
}

class TasksHeader extends Component<TaskHederProps, TaskHeaderState> {
    constructor(props: TaskHederProps) {
        super(props);
        this.state = {
            show: false,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });

    }

    render() {
        return (
            <div className="d-flex justify-content-between">
                <div className="task-header p-3"><h5>All Tasks</h5></div>
                <div className="task-menu-options d-flex p-3">
                    <div className="btn-group">
                        <button type="button" onClick={this.handleShow} className="btn rounded-left-lg btn-sm btn-secondary border-0 menu-link  text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg pb-1" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg> New
                        </button>
                        <button type="button" className="btn btn-sm border-0 rounded-right-lg margin-left  menu-link btn-secondary dropdown-toggle dropdown-toggle-split text-white" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only"></span>
                        </button>
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
                            <a className="dropdown-item"  href="#">Edit</a>
                            <a className="dropdown-item"  href="#">Clone</a>
                            <a className="dropdown-item"  href="#">Delete</a>
                        </div>
                    </div>
                    <CreateTask getAllTasksFromDb={this.props.getAllTasksFromDb}  handleShow={this.handleShow} handleClose={this.handleClose} disableForm={false} show={this.state.show} editMode={false} formDataToEdit={null}></CreateTask>
                </div>
            </div>
        )
    }
}

export default TasksHeader;