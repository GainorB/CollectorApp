import React from 'react';

const UpdateItemForm = props => {
    return (
        <div>
            <form onSubmit={props.handleUpdate}>
                <p><span className="updateInfo">
                    Current Brand: {props.updatedItemInfo.brand}<br/>
                    New Brand: {props.brand}
                    </span>
                <p><input type="text" name="brand" onChange={props.handleChange} maxLength="15" required/></p></p>
                
                <p><span className="updateInfo">Current Title: {props.updatedItemInfo.title}</span>
                <p><input type="text" name="title" onChange={props.handleChange} maxLength="50" required/></p></p>
                
                <p><span className="updateInfo">Current Condition: {props.updatedItemInfo.condition}</span>
                <p><input type="number" name="condition" onChange={props.handleChange} min="0" max="10" required/></p></p>
                
                <p><span className="updateInfo">Current Size: {props.updatedItemInfo.size}</span>
                <p><input type="number" name="size" onChange={props.handleChange} min="0" max="20" required/></p></p>
                
                <p><span className="updateInfo">Previously purchased for? {props.updatedItemInfo.purchasedfor}</span>
                <p><input type="number" name="purchasedfor" onChange={props.handleChange} /></p></p>
                
                <p><span className="updateInfo">Previously purchased from? {props.updatedItemInfo.purchasedfrom}</span>
                <p><input type="text" name="purchasedfrom" onChange={props.handleChange} /></p></p>
                
                <p><span className="updateInfo">Current Worth: {props.updatedItemInfo.worth}</span>
                <p><input type="number" name="worth" onChange={props.handleChange} /></p></p>
                
                <p><span className="updateInfo">Current Image</span><br/><img src={props.updatedItemInfo.image} className="updateImage" />
                <p><input type="url" name="image" onChange={props.handleChange} /></p></p>
                
                <p><span className="updateInfo">Previously for sale? {props.updatedItemInfo.forsale}</span>
                <p><select name="forsale" onChange={props.handleChange}>
                <option defaultValue="change">Change Me</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select></p></p>
                <input type="submit" value="Update Item" /> <input type="reset" value="Reset" />
            </form>
        </div>
    );
}

export default UpdateItemForm;