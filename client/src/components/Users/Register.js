import React, { Component } from 'react';
import axios from 'axios';
import NewUserForm from './NewUserForm';

class Register extends Component {
    constructor(props){
        super(props);

        // INITIAL STATE USED TO STORE FORM INPUTS
        this.state = {
            username: '',
            email: '',
            password: '',
            message: ''
        }

        // BINDING
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    // RESET ERROR MESSAGE ON REGISTRATION FORM
    clearMessage(){
        this.setState({ message: '' });
    }

    // HANDLE INPUT FROM FORM ELEMENTS
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    // REGISTER A NEW USER
    handleRegister(e){
        e.preventDefault();

        const { username, password, email } = this.state;
        // eslint-disable-next-line
        const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'users/new';
        axios.post(endpoint, {
            username, email, password
        })
        //.then(res => { if(!res.success){ this.setState({ message: 'Invalid Credentials '}) }})
        .then(res => this.props.setUser(res))
        //.then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
        return(
            <NewUserForm 
                handleRegister={this.handleRegister}
                handleChange={this.handleChange}
                clearMessage={this.clearMessage}
                message={this.state.message}
                />
        );
    }

}

export default Register;