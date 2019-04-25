import React from 'react';
import CreateUserFrom from "./CreateUserForm";


class CreateUser extends React.Component {

    handleSubmit = (values)=> {
        console.log(values);
    };


    render() {
        return(
            <CreateUserFrom onSubmit={this.handleSubmit}/>
        );
    }

}

export default CreateUser;