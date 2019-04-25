import React from 'react';
import Image from "./image/Image";
import ProfileInfo from "./profileInfo/ProfileInfo";
import Header from "./header/Header";
import ChatModal from "./chatButton/chatModal/ChatModal";
import UserModal from "./userModal/UserModal";
import TaskModal from "./taskModal/TaskModal";
import './userPage.css'
import Course from "./course/Course";

class UserPage extends React.Component {


    render() {

        return (
            <div className={'userPage'}>
                <Header/>
                <Image/>
                <ProfileInfo/>
                <Course/>
                <footer>
                </footer>
                <ChatModal/>
                <UserModal/>
                <TaskModal/>
            </div>
        );
    }
}
// !!authUser.roles[...] == authUser.roles[...] != null;
// const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];

/*const condition = authUser => {
    const aa = ROLES.STUDENT
    const bb = !!authUser.roles[ROLES.STUDENT];
    debugger;
 return authUser && !!authUser.roles[ROLES.STUDENT];
};*/


export default UserPage;