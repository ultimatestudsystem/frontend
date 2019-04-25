import React from 'react';
import classes from './ChatModal.module.css';
import Modal from "../../../modal/Modal";


const ChatModal = ()=> {


    const handleCloseModal = ()=> {
        const chatModal = document.getElementById('chat-modal');
        chatModal.style.display='none';
        document.body.style.overflowY = 'auto';
    };

    return (
        <Modal name="chatModal" header={<Header />} footer={<FooterMessageTextarea />}>
            <div className={classes.message}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className={classes.message + ' ' + classes.myMessage}>
                Lorem ipsum dolor sit amet, con
            </div>
        </Modal>
    );

    function Header() {
        return (
            <>
                <div className={classes.btnContent}>
                    <button className={classes.btnBack} onClick={handleCloseModal}>
                        &#8249; Вернуться
                    </button>
                </div>
                <div className={classes.userInfo}>
                    <div>
                        Name and Surname
                    </div>
                    <div className={classes.imageContent}>
                        <img className={classes.image} src="/static/media/pic-student.310f1aa9.png" alt=""/>
                    </div>
                </div>
            </>
        );
    }

    function FooterMessageTextarea() {
        return (
            <>
                <textarea id='textareaMessage' className={classes.textarea}></textarea>
                <button className={classes.sendBtn}>send message</button>
            </>
        );
    }
};

export default ChatModal;