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
import Authorization from "../Session/Athorization";
import * as ROLES from '../../constants/roles';

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
// !!authUser.roles[...] == authUser.roles[...] != null;
const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];

/*const condition = authUser => {
    const aa = ROLES.STUDENT
    const bb = !!authUser.roles[ROLES.STUDENT];
    debugger;
 return authUser && !!authUser.roles[ROLES.STUDENT];
};*/


export default UserPage;