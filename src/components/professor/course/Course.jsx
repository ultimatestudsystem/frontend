import React from 'react';
import {connect} from "react-redux";
import SelectCourseBtn from "./courseBtn";
import {withFirebase} from "../../Firebase";
import TimeTableContainer from "./timetable/TimeTableContainer";


class Course extends React.Component {



    componentDidMount() {
        this.getCourses();
    }

    getCourses = ()=> {
        this.props.firebase.course_list_by_professor(this.props.authUser.uid)((courses)=> {
                if (!!courses){
                    let courseList = [];
                    const currentCourseName = Object.values(courses)[0].subject_name;
                    Object.keys(courses).forEach(key=>{
                        const course = courses[key];
                        if ( !!courseList[course.subject_name] )
                            courseList[course.subject_name].push({key:key, groupId: course.group_id})
                        else courseList[course.subject_name] = [{key:key, groupId: course.group_id}];
                    });
                    console.log(courseList);
                    this.props.setCourses(courseList, currentCourseName)
                        .then(this.changeCourse(currentCourseName))
                        .catch(err => console.log(err.message))
                }
            })
        /*this.props.firebase.courses()
            .once('value')
            .then(snapshot=> {
                const obj = snapshot.val();
                if (!!obj) {
                    let course = {};
                    let currentCourseName = '';
                    Object.keys(obj).forEach(key => {
                        const objElement = obj[key];
                        const professorId = objElement.professor_id;
                        if (this.props.authUser.uid === professorId) {
                            if (currentCourseName === '') {
                                currentCourseName=objElement.subject_name
                            }
                            const a = [];
                            a.push({key: key, groupId: objElement.group_id});
                            console.log(key, objElement.group_id)
                            course[objElement.subject_name] = !!course[objElement.subject_name]
                                ? course[objElement.subject_name].push({key: key, groupId:objElement.group_id})
                                : a;
                        }
                    });
                    console.log(course);
                    this.props.setCourses(course, currentCourseName)
                        .then(this.changeCourse(currentCourseName))
                        .catch(e => console.log(e.message));
                }
            })*/
    };

    changeCourse = (name) => {
        this.props.resetCurrentSelectedTasksInfo();
        this.props.changeCourseName(name).then(()=> {
            this.props.setSelectedCourses();
        }).then(() => {
            for (const courseId in this.props.currentCoursesId){
                const currentCourseId = this.props.currentCoursesId[courseId];
                this.getTasks(currentCourseId);
            }
        });
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
        console.log({startDate, endDate});
        this.props.firebase.tasks(course_id)(startDate, endDate)(this.setTask);
    };

    render() {
        return(
            <>
                <SelectCourseBtn courses={this.props.courses} changeCourse={this.changeCourse}/>
                <TimeTableContainer />
            </>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        courses: state.courseState.courses,
        currentCoursesId: state.courseState.currentCoursesId,
        tasks: state.courseState.tasks,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        setCourses: (courses,currentCourseName) => {
            dispatch({type: 'COURSES_SET', courses: courses});
            return Promise.resolve(dispatch({type: 'SET_CURRENT_COURSE' , courseName: currentCourseName}))
        },
        changeCourseName: (courseName) => {
            const action = {type: 'SET_CURRENT_COURSE', courseName: courseName}
            return Promise.resolve(dispatch(action));
        },
        setSelectedCourses:()=>{ // todo check and delete
            const action = {type: 'SET_SELECTED_COURSES'};
            return Promise.resolve(dispatch(action));
        },
        setTasks: (tasks, course_id)=>{
            const action = {type: 'SET_TASKS', tasks, course_id};
            dispatch(action);
        },
        resetCurrentSelectedTasksInfo: ()=>{
            dispatch({type:'RESET_CURRENT_SELECTED_TASK'})
        }
    }
};

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Course));