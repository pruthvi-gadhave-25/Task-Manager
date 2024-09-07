import { Component } from "react";
import Header from "./Header";
import TimeTrackingHeader from "./TimeTrackingHeader";

class TimeTracking extends Component {
    render() {
        return (
            <>
                <Header></Header>
                <TimeTrackingHeader></TimeTrackingHeader>

            </>

        )
    }
}

export default TimeTracking;