import React from 'react';

const NewUserForm = (props) => {
    return (
        <div className="NewUserForm">
            <p id="message" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
            <form onSubmit={props.handleRegister}>
                <p><p className="tooltip">Username</p>
                    <input type="text" name="username" placeholder="Username" onChange={props.handleChange} required/></p>
                <p><p className="tooltip">Email</p>
                    <input type="email" name="email" placeholder="Email" onChange={props.handleChange} required/></p>
                <p><p className="tooltip">Password</p>
                    <input type="password" name="password" placeholder="Password" onChange={props.handleChange} required/></p>
                <input type="submit" value="register"/>
            </form>
        </div>
    );
}

export default NewUserForm;