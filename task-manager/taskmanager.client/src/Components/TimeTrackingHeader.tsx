import { Component } from "react";
import SetLogTime from './SetLogTime';
interface TimeTrackingHeaderState {
    show: boolean;
}

class TimeTrackingHeader extends Component<NonNullable<unknown>, TimeTrackingHeaderState> {
    constructor(props: NonNullable<unknown>) {
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
            <>
                <div className="d-flex justify-content-between">
                    <div className="task-header p-3"><h5>All Tasks</h5></div>
                    <div className="task-menu-options p-3">
                        <div className="btn-group">
                            <button type="button" onClick={this.handleShow} className="btn rounded btn-sm btn-secondary border-0 menu-link  text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-clock mb-1" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg> Start
                            </button>
                            <div className="dropdown ml-1">
                                <button className="btn  btn-sm dropdown-toggle menu-link text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Log Time
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn text-dark border btn-sm ml-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                            </svg>
                        </button>
                        <SetLogTime handleShow={this.handleShow} handleClose={this.handleClose} show={this.state.show}></SetLogTime>
                    </div>
                </div>

            </>
        )
    }
}

export default TimeTrackingHeader;                                           