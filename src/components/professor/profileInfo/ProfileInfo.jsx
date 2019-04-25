import React from 'react';
import classes from './ProfileInfo.module.css';
import {connect} from "react-redux";
import {withFirebase} from "../../Firebase";
import CourseList from "./course/CourseList";
import {Link} from "react-router-dom";

/*const Details = ({studentInfo, authUser}) => {
  return (

  );
};*/


class ProfileInfo extends React.Component {



    render() {
        const { authUser } = this.props;

        return (
            <div className={classes.profileInfo}>
                <div className={classes.name}>
                    {`${authUser.first_name} ${authUser.last_name} ${authUser.middle_name}`}
                </div>
                <div className={classes.type}>
                    преподаватель
                </div>
                <div className={classes.profInfo}>
                    <div className={classes.personalInfo}>
                        <div className={classes.infoTitle}>
                            Персональные данные:
                        </div>
                        <div className={classes.info}>
                            {authUser.birth_date}
                        </div>
                    </div>
                    <div className={classes.contact}>
                        <div className={classes.infoTitle}>
                            Контакты:
                        </div>
                        <div className={classes.info}>
                            {authUser.email}
                        </div>
                        <div className={classes.info}>
                            {authUser.phone}
                        </div>
                    </div>
                </div>
                <CourseList/>
                <div className={classes.editBtn}>
                    <Link to={''}>Редактировать</Link>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(ProfileInfo));