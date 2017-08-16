import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

class Login extends Component {
    constructor(props){
        super(props);

        // INITIAL STATE FOR HANDLING FORM INPUT
        this.state = {
            username: '',
            email: '',
            password: '',
            message: ''
        }

        // BINDING
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    // RESET MESSAGES ON THE FORM
    clearMessage(){
        this.setState({ message: '' });
    }

    // HANDLE INPUT FROM FORM ELEMENTS
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    // HANDLE LOGGING IN USERS
    handleLogin(e){
        e.preventDefault();

        const { username, password } = this.state;
        // eslint-disable-next-line
        const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'users/authenticate';
        axios.post(endpoint, {
            username, password
        })
        //.then(res => { if(!res.success){ this.setState({ message: 'Invalid Credentials '}) }})
        .then(res => this.props.setUser(res))
        //.then(res => console.log(res))
        .catch(err => console.log(err));
    }

    // HANDLE FORGOTTEN PASSWORD
    handleForgotten(e){
        e.preventDefault();

        const { email } = this.state;
        // eslint-disable-next-line
        const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'users/forgot_password';
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        //.then(res => !res.success ? this.setState({ message: 'Invalid Credentials '}) : this.props.setUser(res))
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
            return(
                <LoginForm 
                    handleLogin={this.handleLogin}
                    handleChange={this.handleChange}
                    clearMessage={this.clearMessage}
                    message={this.state.message}
                    />
            );
    }

}

export default Login;