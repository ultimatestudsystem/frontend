import React from 'react'
import Modal from "../modal/Modal";
import classes from './TaskModal.module.css';


const TaskModal = ()=> {
    const taskModal = 'taskModal';


    return (
        <Modal name={taskModal}
               header={<Header />}
               footer={<Footer />}
        >
            <div className={classes.taskInfo}>
                <div className={classes.infoTitle}>
                    Описание:
                </div>
                <div>
                    <span className={classes.infoTitle}>Предмет:</span> Информационная безопасность
                </div>
                <div>
                    <span className={classes.infoTitle}>Преподаватель:</span> Расиэль Кристина Андреевна
                </div>
                <div>
                    <span className={classes.infoTitle}>Задание:</span> He my polite be object oh change. Consider no mr am overcame yourself
                    throwing sociable children. Hastily her totally conduct may. My solid by stuff
                    first smile fanny.
                </div>
                <div>
                    <button className={classes.downloadBtn}>Скачать задание</button>
                </div>
            </div>
        </Modal>
    );

    function Header() {
        return (
            <div className={classes.headerInfo}>
                <div className={classes.taskTitle}>
                    Пассивный сбор данных
                </div>
                <div className={classes.taskSubTitle}>
                    До 15 марта
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

export default TaskModal;