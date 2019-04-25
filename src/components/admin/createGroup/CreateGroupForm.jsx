import React from 'react';
import classes from "./index.module.css";
import {Field, reduxForm, reset} from "redux-form";
import {withFirebase} from "../../Firebase";


const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
// const minLength = min => value =>
//     value && value.length < min ? `Must be ${min} characters or more` : undefined;
// const minLength2 = minLength(2);
const maxLength25 = maxLength(25)
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
/*const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)*/



const renderField = ({ id, input, label, placeholder, type, meta: { touched, error, warning } }) => (
    <>
        <label htmlFor={id} className={classes.title}>{label}</label>
        <div className={classes.inputContainer}>
            <input {...input} placeholder={placeholder} className={classes.input} id={id} type={type}/>
            <div className={classes.error}>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </>
);



const CreateGroupForm = (props)=> {

    const {handleSubmit, pristine, submitting} = props;
    const onChange = event => {
       /* const id = event.target.value;
        console.log(id)
        props.firebase.users()
            .orderByChild('user_id')
            .equalTo(id)
            .limitToFirst(1)
            .once('value')
            .then(snapshot=> {
                console.log(snapshot.val());
                if (snapshot.val() == null){
                }
            })
            .catch(error=> {
                console.log(error.message)
            });*/
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.container}>
            <div className={classes.form}>
                <div className={classes.formItem + ' ' + classes.formItemTitle}>
                    <h1 className={classes.formItemTitleText}>Добавить новую группу</h1>
                </div>
                <div className={classes.formItem}>
                    <Field type={'text'}
                           name={'group_id'}
                           id={'group_id'}
                           placeholder={'2019-XXX'}
                           label={'Номер группы'}
                           component={renderField}
                           validate={[required, maxLength25]}
                    />
                </div>
                <div className={classes.formItem}>
                    <Field type={'text'}
                           name={'subject_name'}
                           id={'subject_name'}
                           placeholder={'математический анализ'}
                           label={'Название предмета'}
                           component={renderField}
                           validate={[required]}
                    />
                </div>
                <div className={classes.formItem}>
                    <Field type={'text'}
                           name={'professor_id'}
                           id={'professor_id'}
                           onChange={onChange}
                           placeholder={'Иван Иванов Иванович'}
                           label={'Преподаватель'}
                           component={renderField}
                           validate={[required]}
                    />
                </div>
                <div className={classes.formItem}>
                    <Field type={'text'}
                           name={'startDate'}
                           id={'startDate'}
                           placeholder={'02.02.2019'}
                           label={'Дата начала курса'}
                           component={renderField}
                           validate={[required]}
                    />
                </div>
                <div className={classes.formItem}>
                    <Field type={'text'}
                           name={'endDate'}
                           id={'endDate'}
                           placeholder={'02.05.2019'}
                           label={'Дата окончания курса'}
                           component={renderField}
                           validate={[required]}
                    />
                </div>
                <div className={classes.formItem + ' ' + classes.formItemSubmitBtn} >
                    <button className={classes.submitBtn} type={'submit'} disabled={pristine || submitting}>Добавить</button>
                </div>
            </div>
        </div>
        </form>
    );
};

const afterSubmit = (result, dispatch) =>
    dispatch(reset('createGroup'));

export default reduxForm({
    form: 'createGroup',
    onSubmitSuccess: afterSubmit,

})(withFirebase(CreateGroupForm));