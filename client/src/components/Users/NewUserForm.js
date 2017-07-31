import React from 'react';

const NewUserForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleRegister}>
                <p id="message" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
                <input type="text" name="username" placeholder="Username" onChange={props.handleChange} required/>
                <input type="email" name="email" placeholder="Email" onChange={props.handleChange} required/>
                <input type="password" name="password" placeholder="Password" onChange={props.handleChange} required/>
                <input type="submit" value="Register"/>
            </form>
        </div>
    );
}

export default NewUserForm;