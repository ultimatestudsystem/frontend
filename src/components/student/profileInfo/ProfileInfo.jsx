import React from 'react';
import classes from './ProfileInfo.module.css';
import {connect} from "react-redux";
import {withFirebase} from "../../Firebase";
import { NavLink} from "react-router-dom";



class ProfileInfo extends React.Component {



    componentDidMount() {
        const uid = this.props.authUser.uid;
        this.props.firebase
            .onStudentListener(uid, (studentInfo)=>{
                this.props.studentReducer(studentInfo);
                this.getCourses();
            });
    }


    getCourses =()=> {
        this.props.firebase
            .course_list_by_group(this.props.studentInfo.groupId)((courses)=>{
                this.props.setCourses(courses)
                    .then(()=>{
                        Object.keys(this.props.courses).forEach(key=>{
                            this.getTasks(key)
                        })
                    });
            })
    };

    setTask = (tasks, course_id)=> {
        this.props.setTasks(tasks, course_id);
    };
    getTasks = (course_id)=> {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        const startDate = date.getTime()/1000|0;
        date.setDate(date.getDate()+4);
        const endDate = date.getTime()/1000|0;
        // console.log({startDate, endDate});
        this.props.firebase.tasks(course_id)(startDate, endDate)(this.setTask);
    };

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
                    <NavLink to={'#'}>Редактировать</NavLink>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
  return {
      authUser: state.sessionState.authUser,
      studentInfo: state.studentState,
      courses: state.studentState.courses,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        studentReducer: (studentInfo)=> {
            console.log(studentInfo);
            if (!!studentInfo)
            dispatch({
                type:'SET_STUDENT_INFO',
                averageScore: studentInfo.average_score,
                groupId: studentInfo.group_id,
                additionalInfo: studentInfo.additional_info,
            })
        },
        setCourses: courses => {
            return Promise.resolve(dispatch({type: 'SET_STUDENT_COURSES', courses}))
        },
        setTasks: (tasks, course_id)=>{
            const action = {type: 'SET_STUDENT_TASKS', tasks, course_id};
            dispatch(action);
        },
    }
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(ProfileInfo));