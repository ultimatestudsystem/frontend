import React from 'react';
import classes from './ProfileInfo.module.css';

const Details = () => {
  return (
      <div className={classes.profInfo}>
          <div className={classes.personalInfo}>
              <div className={classes.infoTitle}>
                  Персональные данные:
              </div>
              <div className={classes.info}>
                  05.10.98
              </div>
              <div className={classes.info}>
                  Группа: 11-605
              </div>
              <div className={classes.info}>
                  Средний балл: 82
              </div>
          </div>
          <div className={classes.contact}>
              <div className={classes.infoTitle}>
                  Контакты:
              </div>
              <div className={classes.info}>
                  person@email.com
              </div>
              <div className={classes.info}>
                  +7 (789) 723 2328
              </div>
          </div>
      </div>
  );
};


const ProfileInfo = ()=> {

    return (
        <div className={classes.profileInfo}>
            <div className={classes.name}>
                Иван Иванов Иванович
            </div>
            <div className={classes.type}>
                студент
            </div>
            <Details />
            <div className={classes.editBtn}>
                <a>Редактировать</a>
            </div>
        </div>
    );
};

export default ProfileInfo;