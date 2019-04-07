import React from 'react';
import classes from "./Modal.module.css";


const Modal = (props)=> {
    const modalName = props.name;

    const handleCloseModal = ()=> {
        const chatModal = document.getElementById(modalName);
        chatModal.style.display='none';
        document.body.style.overflowY = 'auto';
    };

    return (
        <div id={modalName} className={classes.modalHidden + ' ' + classes.modal }>
            <div className={classes.modalContainer}>
                <div className={classes.modalHeader + ' ' + classes.modalHeaderContent}>
                    {props.header}
                </div>
                <div className={classes.modalContent}>
                    {props.children}
                </div>
                <div className={classes.modalFooter}>
                    {props.footer}
                </div>
            </div>
            <div className={classes.modalOverlay} onClick={handleCloseModal}>

            </div>
        </div>
    );
};

export default Modal;