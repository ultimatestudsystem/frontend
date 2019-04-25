import {withFirebase} from "../../../Firebase";
import {connect} from "react-redux";
import Timetable from "./Timetable";
import React from 'react';
import classes from "./Timetable.module.css";
import Subject from "./subject/Subject";

const DatE = ({date})=> {
    return (
        <div>
            <div className={classes.dateItem}>
                {date}
            </div>
        </div>
    );
};
class TimeTableContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            date: new Date()
        };
    }


    getDate = ()=> {
        let {date} = this.state;
        const dates =[];
        for (let i=0; i < 4; i++){
            const newDate = new Date();
            newDate.setDate(date.getDate() + i);
            dates.push(<DatE key={i} date={newDate.toLocaleDateString()} />);
        }
        return dates;
    };

    render() {
        const currentCourseName = this.props.currentCourseName;
        if (!( currentCourseName === '' || (typeof currentCourseName === 'undefined'))) {
            this.courseItems1 = this.props.courses[currentCourseName];
            this.courseItems = this.courseItems1.map(val=>{
                const tasks = this.props.tasks[val.key];
                console.log(tasks);
                return <Subject key={val.key} courseId={val.key} date={this.state.date} tasks={tasks} groupId={val.groupId}/>
            });
        }
        const dates = this.getDate();
        return (
            <Timetable dates={dates} courseItems={this.courseItems}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        courses: state.courseState.courses,
        tasks: state.courseState.tasks,
        currentCourseName: state.courseState.currentCourseName,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        setTasks: (tasks, course_id) => {
        }
    }
};


export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(TimeTableContainer));
