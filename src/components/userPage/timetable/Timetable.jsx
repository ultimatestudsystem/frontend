import React from 'react';
import classes from './Timetable.module.css';

const Task = () => {
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
              <button className={classes.taskBtn} onClick={handleOpenModal}>task</button>
          </div>
      </div>
  );
};

const Subject = ()=> {

    function handleOpenModal(){
        const chatModal = document.getElementById('userModal');
        chatModal.style.display='flex';
        document.body.style.overflowY = 'hidden';
    }
  return (
      <div className={classes.subjectContent}>
          <div className={classes.subject}>
              <div className={classes.subjectName} onClick={handleOpenModal}>
                  subject name
              </div>
          </div>
          <Task/>
          <Task/>
          <Task/>
          <Task/>

      </div>
  );
};

const Date = ()=> {
  return (
      <div>
          <div className={classes.dateItem}>
              02.02.19
          </div>
      </div>
  );
};

const Timetable = ()=> {
  return (
      <div className={classes.timeTable}>
          <div className={classes.controlPanel}>
              <div className={classes.innerControlPanel}>
                  <button className={classes.controlPanelBtn}>&#8249;</button>
                  <button className={classes.controlPanelBtn}>&#8250;</button>
              </div>
          </div>
          <div className={classes.date}>
              <Date/>
              <Date/>
              <Date/>
              <Date/>

          </div>
          <div className={classes.content}>
             <Subject/>
             <Subject/>
             <Subject/>

          </div>
      </div>
  );
};

export default Timetable;

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