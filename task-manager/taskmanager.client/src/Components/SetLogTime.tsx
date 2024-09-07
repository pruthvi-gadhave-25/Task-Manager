import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import './SetLogTime.css';

interface SetLogtimeProps {
    handleShow: () => void;
    handleClose: () => void;
    show: boolean;
}

interface SetLogTimeState {
    timerRunning: boolean;
    elapsedTime: number;
}

class SetLogTime extends Component<SetLogtimeProps, SetLogTimeState> {
    private timerInterval: NodeJS.Timeout | null = null;

    constructor(props: SetLogtimeProps) {
        super(props);
        this.state = {
            timerRunning: false,
            elapsedTime: 0,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    handleClose() {
        this.setState({ timerRunning: false, elapsedTime: 0 });
        this.props.handleClose();
    }

    handleShow() {
        this.setState({ timerRunning: false, elapsedTime: 0 });
        this.props.handleShow();
    }

    startTimer() {
        if (!this.state.timerRunning) {
            this.setState({ timerRunning: true });
            this.timerInterval = setInterval(() => {
                this.setState((prevState) => ({ elapsedTime: prevState.elapsedTime + 1000 }));
            }, 1000);
        }
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.setState({ timerRunning: false });
    }

    handleSubmit() {
        const totalTime = this.state.elapsedTime;
        console.log('Total Time:', totalTime);
        /*        this.stopTimer();*/
        this.props.handleClose();
    }

    render() {
        const { elapsedTime } = this.state;

        //const formatTime = (milliseconds: number): string => {
        //    const seconds = Math.floor(milliseconds / 1000);
        //    const minutes = Math.floor(seconds / 60);
        //    const hours = Math.floor(minutes / 60);

        //    return `${('0' + hours).slice(-2)} h : ${('0' + (minutes % 60)).slice(-2)} m : ${('0' + (seconds % 60)).slice(-2)} s`;
        //};

        return (
            <>
                <Modal className="custom-modal-class" show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header className='px-3 py-1 bg-light'>
                        <Modal.Title>
                        </Modal.Title>
                        <div className="styles-for-stopwatch">
                            <div className="m-0" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                                </svg>
                            </div>
                            <div className="m-0">START TIMER</div>
                            <div className="m-0">
                                <div className="timer">
                                    <span className="digits">
                                        <h5 className="d-inline-block hours">{('0' + Math.floor((elapsedTime / 3600000) % 24)).slice(-2)}</h5> h <span className="font-wediht-bold px-1">:</span>
                                    </span>
                                    <span className="digits">
                                        <h5 className="d-inline-block minues">{('0' + Math.floor((elapsedTime / 60000) % 60)).slice(-2)}</h5> m <span className="font-wediht-bold px-1">:</span>
                                    </span>
                                    <span className="digits mili-sec">
                                        <h5 className="d-inline-block seconds">{('0' + Math.floor((elapsedTime / 1000) % 60)).slice(-2)}</h5> s
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="button"
                            className="border-0 cancel-button p-0"
                            aria-label="Close"
                            onClick={this.props.handleClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg text-dark" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-container" id="formContainer">
                            <form id="myForm" className="p-2">
                                <div className="">
                                    <div className="form-group  mb-3 ">
                                        <label className="d-inline-flex mb-0 text-danger" htmlFor="taskNumber">Task*<div id="taskNumberError" className="errorStyle pl-3 text-danger "></div></label>
                                        <select className="form-control rounded-lg" name="taskNumber" id="taskNumber"
                                        >
                                            <option selected disabled>Select Task</option>
                                            <option value="Nikhil">56</option>
                                            <option value="Pruthvi">1234</option>
                                            <option value="Saransh">23</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="d-inline-flex mb-0" htmlFor="description">Notes
                                            <div id="descriptionError" className="errorStyle pl-3 text-danger "></div>
                                        </label>
                                        <textarea name="description" placeholder="Add notes" className="form-control overflow-auto rounded-lg" id="description" rows={1} maxLength={150} required />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body >
                    <Modal.Footer className="d-flex justify-content-start ">
                        <Button className="menu-link border-0" onClick={this.startTimer}>
                            Start Timer
                        </Button>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal >
            </>
        );
    }
}

export default SetLogTime;