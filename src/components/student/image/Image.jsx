import React from 'react';
import profilePic from "./pic-student.png";
import classes from './Image.module.css'

const Image = (props) => {

    return (
        <div className={classes.profilePic}>
            <img src={profilePic} alt={''}/>
        </div>
    );
};

export default Image;