import React from 'react';


const SignUpPage = ()=> {
    return (
        <div>
            <h1>Sign up</h1>
            <SignUpForm/>
        </div>
    );
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SignUpForm extends React.Component {


    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {

        console.log(this.state)

        event.preventDefault();
    };

    onChange = (e)=> {
        this.setState({[e.target.name]: e.target.value })
    };

    render() {

        const {error , email, password} = this.state;
        let isInvalid = email === '' || password === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       name={'email'}
                       placeholder={'Email address'}
                       onChange={this.onChange}
                       value={email}
                />
                <input type="password"
                       name={'password'}
                       placeholder={'password ...'}
                       onChange={this.onChange}
                       value={password}
                />
                <button type={'submit'} disabled={isInvalid}>Sign Up</button>
                {error && <p> Error: {error.message}  </p>}
            </form>
        );

    }
}

export default SignUpPage;