import React from 'react';
import classes from './index.module.css';
import {CreateUser} from "./createUser";
import Sidebar from "./sidebar";
import {CreateGroupPage} from "./createGroup";
import {Link, Route} from "react-router-dom";


class AdminPage extends React.Component {

    render() {
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Link to="#" className={classes.logo}>
                        <img src="https://img.grouponcdn.com/coupons/XdUh1MsNvCNhz2JTQWEo9e51764/vistaprint-2000x1268" alt={''}/>
                    </Link>
                </div>
                <div className={classes.sidebar}>
                    <Sidebar/>
                </div>
                <div className={classes.main}>
                    {/*<CreateUser/>*/}
                    <Route exact path={'/admin/'} component={CreateUser}/>
                    <Route exact path={'/admin/add-user'} component={CreateUser}/>
                    <Route exact path={'/admin/add-group'} component={CreateGroupPage}/>
                </div>
                <div className={classes.footer}>
                </div>
            </div>
        );
    }

}


export default AdminPage;