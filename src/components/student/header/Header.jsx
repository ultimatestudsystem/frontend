import React from 'react';
import classes from './Header.module.css'
import SignOut from "../../signOut";
import {Link} from "react-router-dom";

const Header = ()=> {

    return (
        <header>
            <div className={classes.container}>
                <Link to="#" className={classes.logo}>
                    <img src="https://img.grouponcdn.com/coupons/XdUh1MsNvCNhz2JTQWEo9e51764/vistaprint-2000x1268" alt={''}/>
                </Link>
                <nav>
                    <ul>
                        <li><Link to="#">Меню</Link></li>
                    </ul>
                </nav>
                <nav className={classes.exitBtnContainer}>
                    <ul>
                        <li><SignOut/></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;