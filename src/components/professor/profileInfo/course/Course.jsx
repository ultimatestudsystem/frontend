import React from 'react';
import classes from "../ProfileInfo.module.css";



const Course =(props)=> {


    return(
        <div className={classes.courseItem}>
            <div className={classes.courseTitle}>
                {props.title}
            </div>
            {props.courseItems}
        </div>
    );
};

export default Course;