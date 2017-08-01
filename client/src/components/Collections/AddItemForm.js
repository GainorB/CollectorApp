import React from 'react';
import '../../css/flexboxgrid.css';

const AddItemForm = props => {

const handleClick = () => {
    document.querySelector('.hidden').classList.toggle('show');
}

    return (
        <div className="container AddItemForm">
            <div className="row center-xs center-sm center-md center-lg middle-xs middle-sm middle-md middle-lg">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <p id="message" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
                        <form onSubmit={props.handleNewItem}>
                            <p className="formTitle">Required</p>
                            
                            <p><p className="tooltip">Select a category for your listing.</p>
                            <select id="category" name="category" onChange={props.handleChange} required>
                            <option defaultValue="change">Change Me</option>
                            <option value="Footwear">Footwear</option>
                            </select></p>
                            <p><p className="tooltip">Select a brand for your listing.</p>
                            <input type="text" name="brand" placeholder="Brand" onChange={props.handleChange} maxLength="15" required/></p>
                            <p><p className="tooltip">Select a title for your listing.</p>
                            <input type="text" name="title" placeholder="Title" onChange={props.handleChange} maxLength="50" required/></p>
                            <p><p className="tooltip">Condition of your item? Out of 10. </p>
                            <input type="number" name="condition" placeholder="Condition" onChange={props.handleChange} min="0" max="10" required/></p>
                            <p><p className="tooltip">What size is your item?</p>
                            <input type="number" name="size" placeholder="Size" onChange={props.handleChange} min="0" max="20" required/></p>
                            <p className="formTitle" onClick={() => handleClick()}>More Options?</p>
                            <div className="hidden">
                                <p><p className="tooltip">How much did you spend on your item?</p>
                                <input type="number" name="purchasedfor" placeholder="Purchase Price" onChange={props.handleChange} /></p>
                                <p><p className="tooltip">Where did you purchase from?</p>
                                <input type="text" name="purchasedfrom" placeholder="Purchased From" onChange={props.handleChange} /></p>
                                <p><p className="tooltip">How much do you think your item is worth?</p>
                                <input type="number" name="worth" placeholder="Worth" onChange={props.handleChange} /></p>
                                <p><p className="tooltip">For sale? Yes or No</p>
                                <select name="forsale" onChange={props.handleChange}>
                                <option defaultValue="change">Change Me</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select></p>
                                <p><p className="tooltip">Want to include an image?</p>
                                <input type="url" name="image" placeholder="Image 1" onChange={props.handleChange} /></p>
                            </div>
                            <input type="submit" value="New Item" />
                        </form>
                </div>
            </div>
        </div>
    );
}

export default AddItemForm;