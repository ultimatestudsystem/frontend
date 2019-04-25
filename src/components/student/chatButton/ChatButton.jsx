import React from 'react';
import classes from './ChatButton.module.css';


const ChatButton = (props)=> {

    const closeOtherModal = ()=> {
        if ( !!props.modalName) {
            const chatModal = document.getElementById(props.modalName);
            chatModal.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
    };

    function handleOpenModal(){
        closeOtherModal();
        const chatModal = document.getElementById('chatModal');
        chatModal.style.display='flex';
        document.body.style.overflowY = 'hidden';
    }

    return (
        <div className={classes.btnOpenChatContent}>
            <button className={classes.btnOpenChat}  onClick={handleOpenModal} id="btn-open-chat">Написать сообщение</button>
        </div>
    );
};

export default ChatButton;