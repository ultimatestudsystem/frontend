import React from 'react';
import CreateGroupForm from "./CreateGroupForm";
import {withFirebase} from "../../Firebase";


const CreateGroupPage = (props)=> {

    const handleSubmit = (values)=> {
        props.firebase.courses().push(values);
    };

    return (
        <CreateGroupForm onSubmit={handleSubmit} />
    );
};

export default withFirebase(CreateGroupPage);