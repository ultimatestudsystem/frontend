import React from 'react';
import TimeTableContainer from "./timetable/TimeTableContainer";
import {connect} from "react-redux";
import {withFirebase} from "../../Firebase";


class Course extends React.Component {

    render() {
        return (
            <TimeTableContainer/>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        groupId: state.studentState.groupId,
        authUser: state.sessionState.authUser,
        courses: state.studentState.courses,
        tasks: state.studentState.tasks,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default withFirebase(connect(mapStateToProps,mapDispatchToProps)(Course));