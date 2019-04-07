import React, { Component } from 'react';
import './App.css';
import Image from "./userPage/image/Image";
import ProfileInfo from "./userPage/profileInfo/ProfileInfo";
import ChatButton from "./userPage/chatButton/ChatButton";
import Timetable from "./userPage/timetable/Timetable";
import Header from "./userPage/header/Header";
import ChatModal from "./userPage/chatButton/chatModal/ChatModal";
import UserModal from "./userPage/userModal/UserModal";
import TaskModal from "./userPage/taskModal/TaskModal";

class App extends Component {
  render() {
    return (
      <div className="App">
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

export default App;
