import React from 'react';

const NewUserForm = (props) => {
    return (
        <div className="NewUserForm">
            <p id="message" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
            <form onSubmit={props.handleRegister}>
                <div><p className="tooltip"><label htmlFor='username'>Username</label></p>
                    <input type="text" name="username" placeholder="Username" onChange={props.handleChange} required/></div>

                <div><p className="tooltip"><label htmlFor='email'>Email</label></p>
                    <input type="email" name="email" placeholder="Email" onChange={props.handleChange} required/></div>

                <div><p className="tooltip"><label htmlFor='password'>Password</label></p>
                    <input type="password" name="password" placeholder="Password" onChange={props.handleChange} required/></div>
                <input type="submit" value="register"/>
            </form>
        </div>
    );
}

export default NewUserForm;