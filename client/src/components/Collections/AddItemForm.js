import React from 'react';

const AddItemForm = props => {

const handleClick = () => {
    document.querySelector('.hidden').classList.toggle('show');
}

    return (
        <div className="AddItemForm">
            <p id="message" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
                <form onSubmit={props.handleNewItem}>
                    <p className="formTitle">Required</p>
                    <p><p className="tooltip">Select a brand for your listing.</p>
                    <input type="text" name="brand" onChange={props.handleChange} maxLength="15" required/></p>
                    <p><p className="tooltip">Select a title for your listing.</p>
                    <input type="text" name="title" onChange={props.handleChange} maxLength="50" required/></p>
                    <p><p className="tooltip">Condition of your item? Out of 10. </p>
                    <input type="number" name="condition" onChange={props.handleChange} min="0" max="10" required/></p>
                    <p><p className="tooltip">What size is your item?</p>
                    <input type="number" name="size" onChange={props.handleChange} min="0" max="20" required/></p>
                    <p className="formTitle moreOpt" onClick={() => handleClick()}>More Options?</p>
                    
                    <div className="hidden">
                        <p><p className="tooltip">How much did you spend on your item?</p>
                        <input type="number" name="purchasedfor" onChange={props.handleChange} /></p>
                        <p><p className="tooltip">Where did you purchase from?</p>
                        <input type="text" name="purchasedfrom" onChange={props.handleChange} /></p>
                        <p><p className="tooltip">How much do you think your item is worth?</p>
                        <input type="number" name="worth" onChange={props.handleChange} /></p>
                        <p><p className="tooltip">Want to include an image? Insert the URL</p>
                        <input type="url" name="image" onChange={props.handleChange} /></p>
                        <p><p className="tooltip">For sale?</p>
                        <select name="forsale" onChange={props.handleChange}>
                        <option defaultValue="change">Change Me</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select></p>
                    </div>
                    <input type="submit" value="New Item" /> <input type="reset" value="Reset" />
                </form>
        </div>
    );
}

export default AddItemForm;