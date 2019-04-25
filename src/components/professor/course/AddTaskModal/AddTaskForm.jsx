import React from 'react'
import Modal from "../../../modal/Modal";
import classes from './AddTaskModal.module.css';
import {Field, reduxForm} from "redux-form";
import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';

const required = value => value ? undefined : 'Required'

const renderTextareaField = (props)=> {
    return (
        <div className={classes.componentFieldContainer}>
            <div>
                <label className={classes.infoTitle} htmlFor={props.id}>{props.label}</label>
            </div>
            <div className={classes.inputContainer}>
                <textarea {...props.input} placeholder={props.placeholder} className={classes.input} id={props.id}/>
                <div className={classes.error}>
                    {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>) || (props.meta.warning && <span>{props.meta.warning}</span>))}
                </div>
            </div>
        </div>
    );
};
const renderComponentField = (props)=> {
    return (
        <div className={classes.componentFieldContainer}>
            <div>
                <label className={classes.infoTitle} htmlFor={props.id}>{props.label}</label>
            </div>
            <div className={`${classes.inputContainer} ${classes.titleContainer}`}>
                <input {...props.input} placeholder={props.placeholder} className={`${classes.input}`} type={props.type} id={props.id}/>
                <div className={classes.error}>
                    {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>) || (props.meta.warning && <span>{props.meta.warning}</span>))}
                </div>
            </div>
        </div>
    );
};

/*
class RenderComponentDatePicker extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
        }
    }

    handleChange = (date)=> {
        this.setState({
            startDate: date,
        })
    };

    render() {
        return (
            <div className={classes.componentFieldContainer}>
                <div>
                    <label className={classes.infoTitle} htmlFor={this.props.id}>{this.props.label}</label>
                </div>
                <div className={classes.inputContainer}>
                    <DatePicker
                        dateFormat="dd.MM.yyyy"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        dropdownMode={'select'}
                        className={classes.inputDatePicker}
                        id={this.props.id}
                        name={this.props.name}
                    />
                    <div className={classes.error}>
                        {this.props.meta.touched && ((this.props.meta.error && <span>{this.props.meta.error}</span>) || (this.props.meta.warning &&
                            <span>{this.props.meta.warning}</span>))}
                    </div>
                </div>
            </div>
        )
    }
}
*/

class AddTaskForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            error:null
        }
    }

    handleSubmit = (values)=> {
        this.props.handleSubmit(values)
            .then(()=>{this.props.resetForm('createNewTask')})
            .catch(error=> this.setState({error}))
    };


    render() {
        const {pristine, submitting} = this.props;
        return (
            <Modal name={this.props.addTaskModal}
                   header={<Header/>}
            >
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.taskInfo}>
                        <Field type={'text'}
                               name={'name'}
                               component={renderComponentField}
                               label={'Название задание'}
                               placeholder={'Название задание'}
                               id={'name'}
                               validate={required}
                        />

                        <Field type={'text'}
                               name={'description'}
                               label={'Задание:'}
                               component={renderTextareaField}
                               id={'description'}
                               validate={required}
                        />
                        <Field type={'text'}
                               name={'expiration_date'}
                               component={renderComponentField}
                               label={'Укажите время срок сдачи:'}
                               placeholder={new Date().toLocaleDateString()}
                               id={'name'}
                               validate={required}
                        />
                        {/*<Field
                        startDate={new Date()}
                        component={RenderComponentDatePicker}
                        name={'expiration_date'}
                        label={'Укажите время срок сдачи:'}
                        id={'expiration_date'}
                        validate={required}
                    />*/}
                        <div className={classes.selectFile}>{/*или выбрать другую?*/}
                            <label htmlFor="fileUpload"
                                   className={classes.downloadBtn}>{this.props.fileName !== '' ? `${this.props.fileName} ` : 'Выбрать файл'}</label>
                            <input type="file" id={'fileUpload'} hidden onChange={this.props.changeFile}/>
                            {/*<button className={classes.downloadBtn}>Загрузить файл</button>*/}
                        </div>
                        <div>
                            {this.state.error && this.state.error.message}
                        </div>
                        <div className={classes.submitBtn}>
                            <button type="submit" disabled={pristine || submitting}
                                    className={(pristine || submitting) ? classes.downloadBtnDisabled : classes.downloadBtn}>Сохранить
                            </button>
                        </div>
                    </div>
                </form>

            </Modal>
        );


        function Header() {
            return (
                <div className={classes.headerInfo}>
                    <div className={classes.taskTitle}>
                        <div className={classes.taskSubTitle}>
                            Информационная безопасность // get it from props
                        </div>

                    </div>
                </div>
            );
        }
    }


}


export default reduxForm({
    form: 'createNewTask',
})(AddTaskForm);