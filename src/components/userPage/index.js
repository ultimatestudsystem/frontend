import React from 'react';
import Image from "./image/Image";
import ProfileInfo from "./profileInfo/ProfileInfo";
import ChatButton from "./chatButton/ChatButton";
import Timetable from "./timetable/Timetable";
import Header from "./header/Header";
import ChatModal from "./chatButton/chatModal/ChatModal";
import UserModal from "./userModal/UserModal";
import TaskModal from "./taskModal/TaskModal";
import './userPage.css'


class UserPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={'userPage'}>
                <Header/>
                <Image/>
                <ProfileInfo/>
                <ChatButton/>
                <Timetable/>
                <footer>
                </footer>
                <ChatModal/>
                <UserModal/>
                <TaskModal/>
            </div>
        );
    }
}

export default UserPage;