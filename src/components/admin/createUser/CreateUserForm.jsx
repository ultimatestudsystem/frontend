import React from 'react';
import classes from './index.module.css';
import {Field, reduxForm} from "redux-form";


const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);
const maxLength25 = maxLength(25)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
/*const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)*/
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

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
)
const CreateUserForm = (props)=>  {


    const onChangeUserType = e => {
        e.target.classList.add(classes.btnActive);
    };

    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.container}>
                <div className={classes.form}>
                    <div className={classes.formItem}>
                        <div className={classes.title}>
                        </div>
                        <div className={classes.inputContainer + ' ' + classes.btnContainer}>
                            <label htmlFor="student" onClick={onChangeUserType} className={classes.btn} >Студент</label>
                            <Field name={'userType'} id={'student'} type={'radio'} component={'input'} value={'STUDENT'}/>
                            <label htmlFor="professor" onClick={onChangeUserType} className={classes.btn} >Преподаватель</label>
                            <Field name={'userType'} type={'radio'} id={'professor'} component={'input'} value={'PROFESSOR'}/>
                        </div>
                    </div>
                    <div className={classes.formItem}>
                        <Field type="email"
                               name={'email'}
                               label="Эл. почта"
                               component={renderField}
                               id={'email'}
                               validate={[required, email]}
                               placeholder={'test@domain.com'}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Field type="password"
                               name={'password'}
                               label={'Пароль'}
                               component={renderField}
                               id={'password'}
                               validate={[required, maxLength25, minLength2]}
                               className={classes.input}
                               placeholder={'****'}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Field type="text"
                               name={'name'}
                               label={'Имя'}
                               component={renderField}
                               id={'name'}
                               validate={[required, minLength2]}
                               className={classes.input}
                               placeholder={'Иван'}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Field type="text"
                               name={'LastName'}
                               label={'Фамилия'}
                               component={renderField}
                               id={'LastName'}
                               validate={[required, minLength2]}
                               className={classes.input}
                               placeholder={'Иванов'}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Field type="text"
                               name={'MiddleName'}
                               label={'Отчество'}
                               component={renderField}
                               id={'MiddleName'}
                               validate={[required, minLength2]}
                               className={classes.input}
                               placeholder={'Иванович'}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Field type="text"
                               name={'Phone'}
                               label={'Тел. номер'}
                               component={renderField}
                               id={'Phone'}
                               validate={[required, number, maxLength25]}
                               className={classes.input}
                               placeholder={'89685455777'}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label htmlFor="Group" className={classes.title}>Группа </label>
                        <div className={classes.inputContainer + ' ' + classes.courseContainer}>
                            <label htmlFor="Group" className={classes.labelCourse}>Курс</label>
                            <Field name="Group" id="Group" component={'select'} className={classes.input + ' ' + classes.inputGroup}>
                                <option value="11-605" selected={''}>11-605</option>
                                <option value="11-604">11-604</option>
                                <option value="11-603">11-603</option>
                                <option value="11-602">11-602</option>
                                <option value="11-601">11-601</option>
                            </Field>
                        </div>
                    </div>
                    <div className={classes.formItem + ' ' + classes.submitBtnContainer}>
                        <div>
                        <button type="submit" disabled={pristine || submitting} className={classes.submitBtn}>Добавить</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset} className={classes.cancelBtn}>Очистить</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );

}


export default reduxForm({
    form: 'createUser'  // a unique identifier for this form
})(CreateUserForm)


