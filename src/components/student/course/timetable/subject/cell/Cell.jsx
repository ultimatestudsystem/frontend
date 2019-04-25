import classes from "../../Timetable.module.css";
import React from "react";
import {connect} from "react-redux";

class Cell extends React.Component {
    // todo get from props

    handleOpenModal(taskModal) {
        this.props.setCurrentNewTaskInfo(this.props.date, this.props.courseId, this.props.currentCourseName);
        this.openModal(taskModal);
    }

    openModal(taskModal){
        const chatModal = document.getElementById(taskModal);
        chatModal.style.display='flex';
        document.body.style.overflowY = 'hidden';
    }


    render() {

        return (
            <div className={classes.taskContent}>
                <div className={classes.task}>
                    {this.props.hasTask
                        ? <button className={classes.taskBtn}
                                  onClick={() => this.handleOpenModal('taskModal')}>{this.props.task.name}</button>
                        : <></>
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        currentCourseName: state.courseState.currentCourseName,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        setCurrentNewTaskInfo: (date, courseId, currentCourseName)=> {
            const action = {type: 'SET_CURRENT_NEW_TASK_INFO', date, courseId, currentCourseName};
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);