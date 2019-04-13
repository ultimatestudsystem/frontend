import React from 'react';
import classes from './Header.module.css'
import SignOut from "../../signOut";

const Header = ()=> {

    return (
        <header>
            <div className={classes.container}>
                <a href="#" className={classes.logo}>
                    <img src="https://img.grouponcdn.com/coupons/XdUh1MsNvCNhz2JTQWEo9e51764/vistaprint-2000x1268"/>
                </a>
                <nav>
                    <ul>
                        <li><a href="">Меню</a></li>
                    </ul>
                </nav>
                <nav>
                    <ul>
                        <li><SignOut/></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;