import React from 'react';
import Header from "../student/header/Header";
import Image from "../student/image/Image";
import classes from './index.module.css'
import ChatModal from "../student/chatButton/chatModal/ChatModal";
import UserModal from "../student/userModal/UserModal";
import TaskModal from "./course/timetable/taskModal/TaskModal";
import ProfileInfo from "./profileInfo/ProfileInfo";
import Course from "./course";
import AddTaskModal from "./course/AddTaskModal/AddTaskModal";

const ProfessorPage = ()=> {


    return (
        <div className={classes.userPage}>
            <Header/>
            <Image/>
            <ProfileInfo/>
            <Course/>
            {/*<SelectCourseBtn/>
            <Timetable/>*/}
            <footer>
            </footer>
            <AddTaskModal/>
            <ChatModal/>
            <UserModal/>
            <TaskModal/>
        </div>
    );
};

export default ProfessorPage;