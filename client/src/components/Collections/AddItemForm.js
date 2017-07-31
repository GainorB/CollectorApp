import React from 'react';

const AddItemForm = props => {
    return (
        <form onSubmit={props.handleNewItem}>
            <p id="message" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
            <input type="text" name="category" placeholder="Category" onChange={props.handleChange} required/>
            <input type="text" name="brand" placeholder="brand" onChange={props.handleChange} required/>
            <input type="text" name="title" placeholder="title" onChange={props.handleChange} required/>
            <input type="number" name="condition" placeholder="condition" onChange={props.handleChange} required/>
            <input type="number" name="size" placeholder="size" onChange={props.handleChange} required/>
            <input type="number" name="purchasedfor" placeholder="purchasedfor" onChange={props.handleChange} />
            <input type="text" name="purchasedfrom" placeholder="purchasedfrom" onChange={props.handleChange} />
            <input type="number" name="worth" placeholder="worth" onChange={props.handleChange} />
            <input type="text" name="forsale" placeholder="forsale" onChange={props.handleChange} />
            <input type="url" name="image1" placeholder="image1" onChange={props.handleChange} />
            <input type="url" name="image2" placeholder="image2" onChange={props.handleChange} />
            <input type="submit" value="New Item" />
        </form>
    );
}

export default AddItemForm;