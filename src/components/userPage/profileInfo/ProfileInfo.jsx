import React from 'react';
import classes from './ProfileInfo.module.css';
import {connect} from "react-redux";
import {withFirebase} from "../../Firebase";

/*const Details = ({studentInfo, authUser}) => {
  return (

  );
};*/


class ProfileInfo extends React.Component {



    componentDidMount() {
        const uid = this.props.authUser.uid;
        this.props.firebase
            .onStudentListener(uid, this.props.studentReducer);
    }

    render() {
        const { authUser, studentInfo } = this.props;

        return (
            <div className={classes.profileInfo}>
                <div className={classes.name}>
                    {`${authUser.first_name} ${authUser.last_name} ${authUser.middle_name}`}
                </div>
                <div className={classes.type}>
                    студент
                </div>
                <div className={classes.profInfo}>
                    <div className={classes.personalInfo}>
                        <div className={classes.infoTitle}>
                            Персональные данные:
                        </div>
                        <div className={classes.info}>
                            {authUser.birth_date}
                        </div>
                        <div className={classes.info}>
                            Группа: {studentInfo.groupId}
                        </div>
                        <div className={classes.info}>
                            Средний балл: {studentInfo.averageScore}
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
                <div className={classes.editBtn}>
                    <a>Редактировать</a>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
  return {
      authUser: state.sessionState.authUser,
      studentInfo: state.studentState
  }
};

const mapDispatchToProps = dispatch => {
    return {
        studentReducer: (studentInfo)=> {
            console.log(studentInfo);
            if (!!studentInfo)
            dispatch({
                type:'SET_STUDENT_INFO',
                averageScore: studentInfo.averageScore,
                groupId: studentInfo.groupID,
                additionalInfo: studentInfo.additional_info,
            })
        }
    }
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(ProfileInfo));