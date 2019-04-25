import classes from "../Timetable.module.css";
import React from "react";
import Cell from "./cell/Cell";

const Subject = ({date, firebase, groupId, tasks, courseId})=> {

    function handleOpenModal(){
        const chatModal = document.getElementById('userModal');
        chatModal.style.display='flex';
        document.body.style.overflowY = 'hidden';
    }

    if (tasks == null) tasks = {};
    const task = [];
    for (let i=0; i < 4; i ++) {
        let newDate = new Date();
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setDate(date.getDate() + i);
        const dateString = newDate.toLocaleDateString();
        if (tasks.hasOwnProperty(dateString)) {
            task.push(<Cell courseId={courseId} date={dateString} key={i} hasTask={true} task={tasks[dateString]} uid={i}/>);
        } else {
            task.push(<Cell courseId={courseId} date={dateString} key={i} hasTask={false} uid={i}/>);
        }
    }





    return (
        <div className={classes.subjectContent}>
            <div className={classes.subject}>
                <div className={classes.subjectName} onClick={handleOpenModal}>
                    {groupId}
                </div>
            </div>
            {task}
        </div>
    );
};

export default Subject;