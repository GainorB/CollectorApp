import React from 'react';

const UpdateItemForm = props => {
    return (
        <form onSubmit={props.handleUpdate}>
            <p><input type="text" name="brand" placeholder="Brand" onChange={props.handleChange} maxLength="15" required/></p>
            <p><input type="text" name="title" placeholder="Title" onChange={props.handleChange} maxLength="50" required/></p>
            <p><input type="number" name="condition" placeholder="Condition" onChange={props.handleChange} min="0" max="10" required/></p>
            <p><input type="number" name="size" placeholder="Size" onChange={props.handleChange} min="0" max="20" required/></p>
            <p><input type="number" name="purchasedfor" placeholder="Purchased For?" onChange={props.handleChange} /></p>
            <p><input type="text" name="purchasedfrom" placeholder="Purchased From?" onChange={props.handleChange} /></p>
            <p><input type="number" name="worth" placeholder="Worth?" onChange={props.handleChange} /></p>
            <p><input type="url" name="image" placeholder="Image?" onChange={props.handleChange} /></p>
            <p><select name="forsale" onChange={props.handleChange}>
            <option defaultValue="change">Change Me</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select></p>
            <input type="submit" value="New Item" /> <input type="reset" value="Reset" />
        </form>
    );
}

export default UpdateItemForm;