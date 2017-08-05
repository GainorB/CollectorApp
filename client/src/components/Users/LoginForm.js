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
                        <p><p className="tooltip">Username</p>
                            <input type="text" name="username" placeholder="username" onChange={this.props.handleChange} required/></p>
                        <p><p className="tooltip">Password</p>
                            <input type="password" name="password" placeholder="Password" onChange={this.props.handleChange} required/></p>
                        <p className="forgot"><span onClick={()=>{this.toggleForgottenPassword()}}>Forgot password?</span></p>
                        <input type="submit" value="login" />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="ForgotForm">
                        <p id="message" style={{ display: this.props.message !== '' ? "block" : "none" }}>{this.props.message}</p>
                    <form onSubmit={this.props.handleForgotten}>
                        <p className="tooltip">Forgot Password</p>
                        <p><input type="email" name="email" placeholder="Email" onChange={this.props.handleChange} required/></p>
                        <p className="forgot"><span onClick={()=>{this.toggleForgottenPassword()}}>Return to login?</span></p> 
                        <input type="submit" value="forgot password" />
                    </form>
                </div>
            )
        }
    }
}