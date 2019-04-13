import React from 'react';
import classes from './Timetable.module.css';
import {withFirebase} from "../../Firebase";
import {connect} from "react-redux";

const Task = ({uid}) => {
    // todo get from props
    const taskModal = 'taskModal';

    function handleOpenModal(){
        const chatModal = document.getElementById(taskModal);
        chatModal.style.display='flex';
        document.body.style.overflowY = 'hidden';
    }


  return (
      <div className={classes.taskContent}>
          <div className={classes.task}>
          {(uid !== '') ? <button className={classes.taskBtn} onClick={handleOpenModal}>task{uid}</button> : ''}
          </div>

      </div>
  );
};

const Subject = ({firebase, course})=> {

    function handleOpenModal(){
        const chatModal = document.getElementById('userModal');
        chatModal.style.display='flex';
        document.body.style.overflowY = 'hidden';
    }

    const tasks = [];
    const tasksFirebase = ['12.04.2019', '13.04.2019', '15.04.2019'];
    let date = new Date();
    for (let i=0; i < 4; i++){
        tasksFirebase.includes(date.toLocaleDateString()) ? tasks.push(<Task uid={i}/>) : tasks.push(<Task uid={''}/>)
        date.setDate(date.getDate()+1 );
    }

    const fakeSetState = tasks => {
        console.log(tasks)
    };

    const getTasks = ()=> {
        const course_id = '1'
        date = new Date();
        const startDate = date.getTime()/1000|0;
        date.setDate(date.getDate()+4);
        const endDate = date.getTime()/1000|0;
        firebase.tasks(course_id)(startDate, endDate)(fakeSetState);
    };

  return (
      <div className={classes.subjectContent}>
          <div className={classes.subject}>
              <div className={classes.subjectName} onClick={handleOpenModal}>
                  subject name
              </div>
          </div>
          {tasks}
      </div>
  );
};

const DatE = ({date})=> {
    return (
      <div>
          <div className={classes.dateItem}>
              {date}
          </div>
      </div>
  );
};

class Timetable extends React.Component {

    constructor(props){
        super(props);

        this.date = this.getDate();
    }

    componentDidMount() {
        this.getCourses();
    }




    getDate = ()=> {
        let date = new Date();
        const dates =[];
        for (let i=0; i < 4; i++){
            date.setDate(date.getDate()+1);
            const currentDate = date.toLocaleDateString();
            dates.push(<DatE date={currentDate} />);
        }
        return dates;
    };


    getCourses = ()=> {
        let groupId = this.props.groupId;
        console.log(groupId);
        if (groupId === ''){
            this.props.firebase.student(this.props.authUser.uid)
                .once('value')
                .then(snapshot=> {
                    groupId = snapshot.val().groupID;
                    this.props.setCourses(groupId, this.props.firebase)
                })
        }else {
            this.props.setCourses(groupId, this.props.firebase)
        }
    };


    render() {
        if (!!this.props.courses)
            this.courseItems = Object.values(this.props.courses).map((course) => {
                return <Subject course={course}/>
            });

        return (
            <div className={classes.timeTable}>
                <div className={classes.controlPanel}>
                    <div className={classes.innerControlPanel}>
                        <button className={classes.controlPanelBtn} onClick={this.getCourses}>&#8249;</button>
                        <button className={classes.controlPanelBtn}>&#8250;</button>
                    </div>
                </div>
                <div className={classes.date}>
                    {this.date}
                </div>
                <div className={classes.content}>
                    {this.courseItems}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        groupId: state.studentState.groupId,
        courses: state.courseState.courses,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        setCourses: (groupId, firebase) => {
            firebase.courses(groupId)(courses => {
                    console.log(courses);
                    const action = {type: 'COURSES_SET', courses: courses};
                    dispatch(action)
                }
            )
        }
    }
};

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Timetable));

/*
*
* <table>
              <tr className={classes.initRow}>
                  <th className={classes.title}>Сегодня</th>
                  <th className={classes.dateInfo}>
                      <div>12 мар</div>
                      <div className={classes.day}>Четверг</div>
                  </th>
                  <th className={classes.dateInfo}>
                      <div>12 мар</div>
                      <div className={classes.day}>Четверг</div>
                  </th>
                  <th className={classes.dateInfo}>
                      <div>12 мар</div>
                      <div className={classes.day}>Четверг</div>
                  </th>
                  <th className={classes.dateInfo}>
                      <div>12 мар</div>
                      <div className={classes.day}>Четверг</div>
                  </th>
              </tr>
              <tr>
                  <td className={classes.title}>Информационная Безопасность</td>
                  <td>
                      <div>
                          <button className={classes.task}>Пассивный сбор данных</button>
                      </div>
                      <div>
                          <button className={classes.task + '' + classes.alert}>Контрольная</button>
                      </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td className={classes.title}>Управление Проектами</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td className={classes.title}>Основы Предпринимательстава</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td className={classes.title}>Архитектура Систем</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
          </table>
* */