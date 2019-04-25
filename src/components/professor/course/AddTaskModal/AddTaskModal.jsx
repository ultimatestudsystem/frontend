import React from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";
import {reset} from "redux-form";
import AddTaskForm from "./AddTaskForm";
import {withFirebase} from "../../../Firebase";
import API from '../../../../api'

const INITIAL_STATE ={
    uploadFile: '',
    fileName: '',
};
class AddTaskModal extends React.Component{

    constructor(props) {
        super(props);
        this.addTaskModal = 'addTaskModal';
        this.state ={...INITIAL_STATE}
    }

    handleSubmit = (values)=> {
        console.log(values); // name => description => uploaded_date => course_id => expire_date => link(server sets)
        const datePattern = /(\d{2})\.(\d{2})\.(\d{4})/; // 22.02.2018 => 2018-02-22
        const uploaded_date = new Date(this.props.date.replace(datePattern,'$3-$2-$1')).getTime()/1000|0;
        values['uploaded_date'] = uploaded_date;
        values['last_updating_date'] = uploaded_date;
        const course_id = this.props.courseId;
        const task_id = this.props.firebase.task_ref(course_id).push(values).key;

        if (!this.state.uploadFile){
            return Promise.resolve('ok')
        }

        const formData = new FormData();
        formData.append(this.state.fileName, this.state.uploadFile);
        formData.append('refUID', task_id);

        return this.props.firebase.getIdToken()
            .then(idToken => {
                formData.append('idToken', idToken);

                return API.post(`/upload/${course_id}`, formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res=> {
                    console.log(res)
                    console.log('ok');
                    this.setState({...INITIAL_STATE})
                    return Promise.resolve(res);
                }).catch(error=>{
                    return Promise.reject(error)
                });
            });
    };

    changeFile = (event) => {
        if (!event.target.files[0]){
            return;
        }
        console.log('upload file selected ',event.target.files);
        this.setState({
            uploadFile: event.target.files[0],
            fileName: event.target.files[0].name,
        })
    };

    render() {
        return (
            <AddTaskForm onSubmit={this.handleSubmit} resetForm={this.props.resetForm} fileName={this.state.fileName} changeFile={this.changeFile} addTaskModal={this.addTaskModal} />
        );
    }


}

const mapStateToProps = (state)=> {
    return {
        date: state.taskState.date,
        courseId: state.taskState.courseId,
        currentCourseName: state.taskState.currentCourseName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetForm: (formName)=> {
            dispatch(reset(formName))
        }
    }
};


export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(AddTaskModal));