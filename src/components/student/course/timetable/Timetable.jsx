import React from 'react';
import classes from './Timetable.module.css';


const Timetable =(props)=>  {
    return (
        <div className={classes.timeTable}>
            <div className={classes.controlPanel}>
                <div className={classes.innerControlPanel}>
                    <button className={classes.controlPanelBtn} >&#8249;</button>
                    <button className={classes.controlPanelBtn}>&#8250;</button>
                </div>
            </div>
            <div className={classes.date}>
                {props.dates}
            </div>
            <div className={classes.content}>
                {props.courseItems}
            </div>
        </div>
    );
};

export default Timetable;