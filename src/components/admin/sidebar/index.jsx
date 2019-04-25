import React from 'react';
import classes from "./index.module.css";
import {NavLink} from "react-router-dom";
import './fontello.css'



const Sidebar = ()=> {


    return (
        <ul className={classes.menuList}>
            <li className={classes.item}>
                <NavLink to={'/admin/professors'}><span><i className="demo-icon icon-users"/></span> Преподаватели</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to={'/admin/students'}><span><i className="demo-icon icon-graduation-cap"/></span> Студенты </NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to={'/admin/add-group'}> <span><i className="demo-icon icon-user-add"/></span> Добавить группу </NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to={'/admin/add-user'}> <span><i className="demo-icon icon-user-add"/></span> Добавить пользователя </NavLink>
            </li>
        </ul>
    );
}

export default Sidebar;