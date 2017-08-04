import React, { Component } from 'react';

export default class LoginForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            forgotPassword: false
        };

        this.toggleForgottenPassword = this.toggleForgottenPassword.bind(this);
    }

    toggleForgottenPassword(){
        this.props.clearMessage(this);
        this.setState({ forgotPassword: !this.state.forgotPassword });
    }

    render() {
        if(!this.state.forgotPassword){
            return (
                <div className="LoginForm">
                        <p id="message" style={{ display: this.props.message !== '' ? "block" : "none" }}>{this.props.message}</p>
                    <form onSubmit={this.props.handleLogin} >
                        <input type="text" name="username" placeholder="username" onChange={this.props.handleChange} required/>
                        <input type="password" name="password" placeholder="Password" onChange={this.props.handleChange} required/>
                        <p id="forgot"><span onClick={()=>{this.toggleForgottenPassword()}}>Forgot password?</span></p>
                        <input type="submit" value="Login" />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="ForgotForm">
                    <p id="forgotTitle">Forgot Password</p>
                        <p id="message" style={{ display: this.props.message !== '' ? "block" : "none" }}>{this.props.message}</p>
                    <form onSubmit={this.props.handleForgotten}>
                        <input type="email" name="email" placeholder="Email" onChange={this.props.handleChange} required/>
                        <p id="forgot"><span onClick={()=>{this.toggleForgottenPassword()}}>Return to login?</span></p> 
                        <input type="submit" value="Forgot password" />
                    </form>
                </div>
            )
        }
    }
}