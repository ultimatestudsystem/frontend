import React from 'react';
import classes from "../ProfileInfo.module.css";
import {connect} from "react-redux";
import Course from "./Course";


const CourseItem = (props)=> {
    return (
        <div className={classes.group}>
            {props.groupId}
        </div>
    );
};

class CourseList extends React.Component {



    render() {
        const courseList = !!this.props.courses ? Object.keys(this.props.courses).map(key=> {
            const courseItems = this.props.courses[key].map(obj=> {
                return <CourseItem key={obj.key} groupId={obj.groupId} />
            });
            return ( <Course key={key} title={key} courseItems={courseItems} />)
        }): null;
        return (
            <div className={classes.courseListContainer}>
                {courseList}
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        courses: state.courseState.courses,
    }
};

export default connect(mapStateToProps, null)(CourseList);