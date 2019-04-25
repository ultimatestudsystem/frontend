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
        if (!!this.props.courses)
        this.courseItems = Object.keys(this.props.courses).map(key=>{
            const course = this.props.courses[key];
            const tasks = this.props.tasks[key];

            console.log(course);
            return <Subject key={key} courseId={key} date={this.state.date} tasks={tasks} subjectName={course.subject_name}/>
        });
        const dates = this.getDate();
        return (
            <Timetable dates={dates} courseItems={this.courseItems}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        courses: state.studentState.courses,
        tasks: state.studentState.tasks,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        setTasks: (tasks, course_id) => {
        }
    }
};


export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(TimeTableContainer));
