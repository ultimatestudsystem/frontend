import React from 'react'
import Modal from "../../modal/Modal";
import classes from  './UserModal.module.css';
import ChatButton from "../chatButton/ChatButton";


const UserModal = ()=> {

    const handleCloseModal = ()=> {
        const chatModal = document.getElementById('userModal');
        chatModal.style.display='none';
        document.body.style.overflowY = 'auto';
    };

    return (
        <Modal name="userModal"
               header={<Header />}
               footer={<Footer />}
        >
            <div className={classes.userInfoContent}>
                <div className={classes.userInfo}>
                    <div className={classes.imageContent}>
                        <img className={classes.image} src="/static/media/pic-student.310f1aa9.png" alt=""/>
                    </div>
                    <div className={classes.nameTypeContent}>
                        <div className={classes.name}>
                            Иван Иванов Иванович
                        </div>
                        <div className={classes.type}>
                            студент
                        </div>
                    </div>
                </div>
                <div className={classes.contact}>
                    <div className={classes.infoTitle}>
                        Контакты:
                    </div>
                    <div className={classes.info}>
                        person@email.com
                    </div>
                    <div className={classes.info}>
                        +7 (789) 723 2328
                    </div>
                </div>
                <div className={classes.subjects}>
                    <div className={classes.infoTitle}>
                        Дисциплины:
                    </div>
                    <div className={classes.subject}>
                        <div className={classes.subjectItem}>
                        <div className={classes.subjectName}>
                            subject name
                        </div>
                        <div className={classes.groups}>
                            <div>
                                group number
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );

    function Header() {
        return (
            <div className={classes.btnContent}>
                <button className={classes.btnBack} onClick={handleCloseModal}>
                    &#8249; Вернуться
                </button>
            </div>
        );
    }

    function Footer () {
        return (
            <div className={classes.footerChatBtn}>
              <ChatButton modalName={'userModal'}/>
            </div>
        );
    }

};

export default UserModal;