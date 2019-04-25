import React from 'react'
import Modal from "../../modal/Modal";
import classes from './TaskModal.module.css';
import {connect} from "react-redux";


const TaskModal = (props)=> {
    const taskModal = 'taskModal';

    let task = {};
    if (!!props.courseId && !!props.date && props.tasks[props.courseId]){
        task = props.tasks[props.courseId][props.date] ? props.tasks[props.courseId][props.date]: {};
    }
    console.log(task)
    return (
        <Modal name={taskModal}
               header={<Header />}
        >
            <div className={classes.taskInfo}>
                <div className={classes.infoTitle}>
                    Описание:
                </div>
                {/*<div>
                    <span className={classes.infoTitle}>Предмет:</span> Информационная безопасность
                </div>
                <div>
                    <span className={classes.infoTitle}>Преподаватель:</span> Расиэль Кристина Андреевна
                </div>*/}
                <div className={classes.description}>
                    <span className={classes.infoTitle}>Задание:</span>{task.description} {/*He my polite be object oh change. Consider no mr am overcame yourself
                    throwing sociable children. Hastily her totally conduct may. My solid by stuff
                    first smile fanny.*/}
                </div>
                <div>
                    <button className={classes.downloadBtn}>Скачать задание</button>
                </div>
                <hr/>
                <div className={classes.description}>
                    <span className={classes.infoTitle}>Статус:</span> не сделано
                </div>
                <div>
                    <textarea name="comment" id="taskComment" cols="80" rows="2.5"/>
                </div>
                <div className={classes.taskBtnSubmitContainer}>
                    <button name="uploadBtn" className={classes.downloadBtn} >Загрузить</button>
                    <button name="submit" type={'submit'} className={classes.downloadBtn} >Отправить</button>
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
                   {/* До 15 марта*/} {`До ${task.expiration_date}`}
                </div>
            </div>
        );
    }

    function Footer () {
        return (
            <></>
        );
    }

};
const mapStateToProps = (state)=> {
    return {
        date: state.taskState.date,
        courseId: state.taskState.courseId,
        tasks: state.studentState.tasks,
    }
};

export default connect(mapStateToProps, null)(TaskModal);