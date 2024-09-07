/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, FormEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gearPng from '..//Icons/gear.png';
import './CreateTask.css';
import axios from 'axios';
import FormUtility from './FormUtility';

interface CustomElements extends HTMLFormControlsCollection {
    id: string;
    taskNumber: HTMLInputElement;
    title: HTMLInputElement;
    dueDate: HTMLInputElement;
    assignedTo: HTMLInputElement;
    priority: HTMLInputElement;
    status: string;
    description: HTMLInputElement;
    completionPercentage: number;
}

interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}

interface CreateTaskProps {
    handleShow: () => void;
    handleClose: () => void;
    disableForm: boolean;
    show: boolean;
    editMode: boolean;
    formDataToEdit: any;
    getAllTasksFromDb : () => void ,
}

interface CreateTaskState {
    show: boolean;
    disableForm: boolean;
    formData: {
        taskNumber: string;
        title: string;
        dueDate: string;
        assignedTo: string;
        priority: string;
        status: string;
        description: string;
        completionPercentage: string;
    };
    counter: number;
}

class CreateTask extends Component<CreateTaskProps, CreateTaskState> {
    defaultFormData = { taskNumber: '', title: '', dueDate: '', assignedTo: '', priority: '', status: '', description: '', completionPercentage: '', };
    constructor(props: CreateTaskProps) {
        super(props);

        this.defaultFormData = {
            taskNumber: '',
            title: '',
            dueDate: '',
            assignedTo: 'Assigned To',
            priority: 'Priority',
            status: 'Yet To Start',
            description: '',
            completionPercentage: '0',
        };

        this.state = {
            show: false,
            disableForm: false,
            formData: { ...this.defaultFormData },
            counter: 0,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    // If entering edit mode, update the formData state with formDataToEdit
    componentDidUpdate(prevProps: CreateTaskProps) {
        if (this.props.editMode && this.props.editMode !== prevProps.editMode) {
            this.setState({
                formData: {
                    taskNumber: this.props.formDataToEdit?.number || '',
                    title: this.props.formDataToEdit?.taskTitle || '',
                    dueDate: this.props.formDataToEdit?.dueDate || '',
                    assignedTo: this.props.formDataToEdit?.assignedTo || 'Assigned To',
                    priority: this.props.formDataToEdit?.priority || 'Priority',
                    status: this.props.formDataToEdit?.status || 'Yet To Start',
                    description: this.props.formDataToEdit?.description || '',
                    completionPercentage: this.props.formDataToEdit?.completionPercentage || '0',
                }
            });
        }
    }

    handleClose() {
        this.setState({ show: false, disableForm: true });
    }

    handleShow() {
        this.setState({ show: true });
    }

    enableForm() {
        FormUtility.enableFormFields('myForm');
    }

    willDisplay(): string {
        return this.props.disableForm ? "d-block" : "d-none";
    }

    disableForm(): boolean {
        return this.props.disableForm;
    }

    //chnage editMode value to pass to avoid edit mode

    //handleSubmit(event: FormEvent) {
    //    //event.preventDefault();

    //    //// Access form data using FormData
    //    //const formData = new FormData(event.target as HTMLFormElement); // error TypeError: Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.

    //    //const formDataJSON: Record<string, string> = {};
    //    //formData.forEach((value, key) => {
    //    //    formDataJSON[key] = value.toString();
    //    //});

    //    //console.log(formDataJSON);
    //    //this.props.handleClose();

    //    event.preventDefault();
    //    console.log(formData);
    //    this.props.handleClose();
    //}

    generateGuid() {
        const randomString = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return (
            randomString() + randomString() + "-" +
            randomString() + "-4" +
            randomString().slice(0, 3) + "-" +
            randomString() + "-" +
            randomString() + randomString() + randomString()
        ).toLowerCase();
    }

    onSubmit = async (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        console.log("createnewTask");
        // Validate form data

        const target = event.currentTarget.elements;
        const data = {
            Id: this.props.formDataToEdit == null ? this.generateGuid() : this.props.formDataToEdit.id,
            Number: parseInt( target.taskNumber.value),
            TaskTitle: target.title.value,
            AssignedTo: target.assignedTo.value,
            Priority: target.priority.value,
            DueDate: target.dueDate.value,
            CompletionPercentage: parseInt(this.state.formData.completionPercentage),
            Status: this.state.formData.status,
            Description: target.description.value,
        };

        try {
            const response = this.props.formDataToEdit == null ? await axios.post('https://localhost:7126/api/Task/CreateTask', data) : await axios.put('https://localhost:7126/api/Task/UpdateTask', data);
            console.log('Response:', response.data);
            this.props.getAllTasksFromDb() ;
        } catch (error) {
            console.error('Error:', error);
        }

        this.props.handleClose();
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };


    // Update the form data and counter in the state
    incrementTask = () => {
        const { formData, counter } = this.state;
        let newTaskNumber = parseInt(formData.taskNumber, 10) + 1;

        if (isNaN(newTaskNumber)) {
            newTaskNumber = 1;
        }

        this.setState({
            formData: {
                ...formData,
                taskNumber: newTaskNumber.toString(),
            },
            counter: counter + 1,
        });
    };


    render() {
        const { formData } = this.state;

        return (
            <div>
                <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header className="bg-light">

                        <Modal.Title><h5 className="m-0 p-0">New Task</h5></Modal.Title>
                        <Button
                            type="button"
                            className="border-0 cancel-button p-0"
                            aria-label="Close"
                            onClick={this.props.handleClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg text-danger" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-container" id="formContainer">
                            <form id="myForm" className="" onSubmit={this.onSubmit}>
                                <div className="">
                                    <div className="form-border">
                                        <div className="form-row mb-2">
                                            <div className="form-group col-md-4 mb-2">
                                                <label className="d-inline-flex mb-0" htmlFor="taskNumber">Task Number<div id="taskError" className="errorStyle pl-3 text-danger"></div></label>
                                                <div className="input-group">
                                                    <input type="text" name='taskNumber' className="form-control rounded-lg bg-light" id="taskNumber" value={formData.taskNumber} maxLength={35} onChange={this.handleInputChange} autoComplete="off" disabled={this.disableForm()} required />
                                                    <img src={gearPng} alt="gear" onClick={this.incrementTask} className="icon-inside-input" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4 mb-2">
                                                <label className="d-inline-flex mb-0" htmlFor="inputTitle">Title<div id="inputTitleError" className="errorStyle pl-3 text-danger  "></div></label>
                                                <input type="text" name="title" className="form-control rounded-lg" id="inputTitle" value={formData.title} onChange={this.handleInputChange} disabled={this.disableForm()} maxLength={40} required />
                                            </div>
                                            <div className="form-group col-md-4 mb-2">
                                                <label className="d-inline-flex mb-0" htmlFor="dueDate">Due Date<div id="dueDateError" className="errorStyle pl-3 text-danger "></div></label>
                                                <input type="date" name="dueDate" className="form-control rounded-lg" value={formData.dueDate} onChange={this.handleInputChange} disabled={this.disableForm()} id="dueDate" required />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="form-group col-md-4 mb-0 pl-2">
                                                <label className="d-inline-flex mb-0" htmlFor="assignTo">Assign To<div id="assignedToError" className="errorStyle pl-3 text-danger "></div></label>
                                                <select className="form-control rounded-lg" value={formData.assignedTo} onChange={this.handleInputChange} name="assignedTo" disabled={this.disableForm()} id="assignedTo"
                                                >
                                                    <option selected disabled>Assigned To</option>
                                                    <option value="Nikhil">Nikhil</option>
                                                    <option value="Pruthvi">Pruthvi</option>
                                                    <option value="Saransh">Saransh</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4 mb-2">
                                                <label className="d-inline-flex mb-0" htmlFor="priority">Priority<div id="priorityError" className="errorStyle pl-3 text-danger "></div></label>
                                                <select className="form-control rounded-lg" id="priority" value={formData.priority} onChange={this.handleInputChange} disabled={this.disableForm()} name="priority"
                                                >
                                                    <option selected disabled>Priority</option>
                                                    <option value="High">High</option>
                                                    <option value="Very Low">Very Low</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row mb-2">
                                        <div className="form-group col-md-8 pt-4 mb-2">
                                            <label className="d-inline-flex mb-0 pb-2" htmlFor="description">Description
                                                <div id="descriptionError" className="errorStyle pl-3 text-danger "></div>
                                            </label>
                                            <textarea name="description" placeholder="Max. 10000 Characters" value={formData.description} onChange={this.handleInputChange} className="form-control overflow-auto rounded-lg" id="description" rows={3} maxLength={150} disabled={this.disableForm()} required />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="menu-link border-0">
                                    Save
                                </Button>

                            </form>
                        </div>
                    </Modal.Body >
                    <Modal.Footer className="d-flex justify-content-start ">
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary" className={`${this.willDisplay()}`} id="formFieldsEnableButton" onClick={this.enableForm}>
                            Enable Fields
                        </Button>
                    </Modal.Footer>
                </Modal >
            </div >
        );
    }
}

export { CreateTask };
export type { CreateTaskProps }