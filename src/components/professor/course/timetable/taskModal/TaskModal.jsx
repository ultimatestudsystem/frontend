import React from 'react'
import Modal from "../../../../modal/Modal";
import classes from './TaskModal.module.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";


// todo check for existing file and show btn for download if exists url
const TaskModal = (props)=> {
    const taskModal = 'taskModal';

    let task = {};
    if (!!props.courseId && !!props.date && props.tasks[props.courseId]){
        task = props.tasks[props.courseId][props.date] ? props.tasks[props.courseId][props.date]: {};
    }
    return (
        <Modal name={taskModal}
               header={<Header />}
        >
            <div className={classes.taskInfo}>
                <div className={classes.infoTitle}>
                    Описание:
                </div>
                <div>
                    <span className={classes.infoTitle}>Предмет:</span> {/*Информационная безопасность*/} {props.currentCourseName}
                </div>
                <div>
                    <span className={classes.infoTitle}>Задание:</span> {/*He my polite be object oh change. Consider no mr am overcame yourself
                    throwing sociable children. Hastily her totally conduct may. My solid by stuff
                    first smile fanny.*/} {task.description}
                </div>
                <div>
                    <button className={classes.downloadBtn}>Скачать задание</button>
                </div>
                <div className={classes.studentListHeader}>
                    <div>
                        Студент
                    </div>
                    <div>
                        Решение
                    </div>
                    <div>
                        Оценка
                    </div>
                </div>
                <div className={classes.studentInfo}>
                    <div className={classes.studentInfoItem + ' ' + classes.name}>
                        Иванов Иван Иванович
                    </div>
                    <div className={classes.studentInfoItem}>
                        <Link to="#" className={classes.link}>Посмотреть</Link>
                    </div>
                    <div className={classes.studentInfoItem}>
                        <span>-</span>
                    </div>
                </div>
                <div className={classes.studentInfo}>
                    <div className={classes.studentInfoItem + ' ' + classes.name}>
                        Иванов Иван Иванович
                    </div>
                    <div className={classes.studentInfoItem}>
                        <Link to="#" className={classes.link}>Посмотреть</Link>
                    </div>
                    <div className={classes.studentInfoItem}>
                        <span>-</span>
                    </div>
                </div>
            </div>
        </Modal>
    );

    function Header() {
        return (
            <div className={classes.headerInfo}>
                <div className={classes.taskTitle}>
                    {/*Пассивный сбор данных*/} {task.name}
                </div>
                <div className={classes.taskSubTitle}>
                    До 15 марта
                </div>
            </div>
        );
    }


};

const mapStateToProps = (state)=> {
  return {
      date: state.taskState.date,
      courseId: state.taskState.courseId,
      tasks: state.courseState.tasks,
      currentCourseName: state.taskState.currentCourseName,
  }
};

export default connect(mapStateToProps, null)(TaskModal);