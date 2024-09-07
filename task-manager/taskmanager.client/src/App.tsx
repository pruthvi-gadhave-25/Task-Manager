import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TimeTracking from './Components/TimeTracking';
import DisplayTask from './Components/DisplayTask';
import LeftNavBar from './Components/LeftNavBar';
import BodySection from './Components/BodySection';
import './App.css';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Component,} from 'react';
import axios from 'axios';

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

interface AppState {
    projects: Project[],
    isNewProjectAdd : boolean ,
}

class App extends Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            projects: [],
            isNewProjectAdd : false ,
        }

        this.getAllTasksFromDb = this.getAllTasksFromDb.bind(this);
    }

    async getAllTasksFromDb() {
        console.log("getAlltaskapp");
        const response = await axios.get('https://localhost:7126/api/Task/GetAllTask') ;
        if(response && response.data){
            this.setState({
                projects : response.data  ,
                isNewProjectAdd : true ,
            }) ;
        }
    }

    // async getAllTasks() {
    //     try {
    //         const response = await axios.get('https://localhost:7126/api/Task/GetAllTask');
    //         if (response && response.data) {
    //             this.projects = response.data;
    //             this.clearTasks();
    //             this.projects.forEach((project: Project) => {
    //                 this.createUserDataList(project);
    //             });

    //             this.setState({ tasksLoaded: true });
    //         }
    //     } catch (error) {
    //         console.error('Error fetching tasks:', error);
    //     }
    // }

render(){
    return(    
        <Router>
    <div className="App body-container">
        <div className="left-nav-bar">
            <LeftNavBar></LeftNavBar>
        </div>
        <div className="switch-container">
            <Switch>
                <Route path="/displayTask" 
                    render={(props) => (
                        <DisplayTask {...props} 
                        getAllTasksFromDb={this.getAllTasksFromDb}  
                        isNewProjectAdd ={this.state.isNewProjectAdd}
                        />
                    )}
                />
                <Route path="/timeTracking" component={TimeTracking} ></Route>
              <Route path="/"  
                  render={(props) => (
                    <BodySection
                        {...props}
                        projects={this.state.projects}
                        getAllTasksFromDb={this.getAllTasksFromDb}  
                       
                    />
                )}
                />
            </Switch>
        </div>
    </div>
        </Router >
    );
}
};

export default App;