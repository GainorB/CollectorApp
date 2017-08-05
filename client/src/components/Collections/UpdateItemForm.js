import React from 'react';

const UpdateItemForm = props => {
    return (
        <div>
            <p className="formMessage" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
            <form onSubmit={props.handleUpdate}>
                <p><span className="currentInfo">
                    {props.updatedItemInfo.brand}</span><br/>
                    <span className="updateInfo">{props.brand}</span>
                <p><input type="text" name="brand" placeholder="Update Brand" onChange={props.handleChange} maxLength="15" required/></p></p>
                
                <p><span className="currentInfo">
                    {props.updatedItemInfo.title}</span><br/>
                    <span className="updateInfo">{props.title}</span>
                <p><input type="text" name="title" placeholder="Update Title" onChange={props.handleChange} maxLength="50" required/></p></p>
                
                <p><span className="currentInfo">
                    {props.updatedItemInfo.condition}/10</span><br/>
                    <span className="updateInfo">{props.condition}/10</span>
                <p><input type="number" name="condition" placeholder="Update Condition" onChange={props.handleChange} min="0" max="10" required/></p></p>
                
                <p><span className="currentInfo">
                    {props.updatedItemInfo.size}</span><br/>
                    <span className="updateInfo">{props.size}</span>
                <p><input type="number" name="size" placeholder="Update Size" onChange={props.handleChange} min="0" max="20" required/></p></p>
                
                {(props.updatedItemInfo.purchasedfor === 0) ? <p></p> : <p><span className="currentInfo">
                    Previously purchased for? ${props.updatedItemInfo.purchasedfor}</span><br/>
                    <span className="updateInfo">${props.purchasedfor}</span>
                <p><input type="number" name="purchasedfor" placeholder="Update Purchase Price" onChange={props.handleChange} /></p></p> }
                
                {(props.updatedItemInfo.purchasedfrom === '') ? <p></p> : <p><span className="currentInfo">
                    Previously purchased from? {props.updatedItemInfo.purchasedfrom}</span><br/>
                    <span className="updateInfo">{props.purchasedfrom}</span>
                <p><input type="text" name="purchasedfrom" placeholder="Update Purchased From" onChange={props.handleChange} /></p></p> }
                
                {(props.updatedItemInfo.worth === 0) ? <p></p> : <p><span className="currentInfo">
                    Current: ${props.updatedItemInfo.worth}</span><br/>
                    <span className="updateInfo">${props.worth}</span>
                <p><input type="number" name="worth" placeholder="Update Sneaker Worth" onChange={props.handleChange} /></p></p> }
                
                {(props.updatedItemInfo.image === '') ? <p></p> : <p><span className="currentInfo">
                    Current Image</span><br/>
                    <img src={props.updatedItemInfo.image} alt={props.updatedItemInfo.title} className="updateImage" /><br/>
                    <span className="updateInfo">New Image</span><br/>
                    <img src={props.image} alt={props.title} className="updateImage" />
                <p><input type="url" name="image" placeholder="Update Image" onChange={props.handleChange} /></p></p> }
                
                {(props.updatedItemInfo.forsale === '') ? <p></p> : <p><span className="currentInfo">
                    Previously for sale? {props.updatedItemInfo.forsale}</span><br/>
                    <span className="updateInfo">Now, I guess its for sale? {props.forsale}</span>
                <p><select name="forsale" onChange={props.handleChange}>
                <option defaultValue="change">Change Me</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select></p></p> }
                <input type="submit" value="Update Item" /> <input type="reset" value="Reset" />
            </form>
        </div>
    );
}

export default UpdateItemForm;