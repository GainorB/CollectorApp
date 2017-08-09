import React from 'react';

const UpdateItemForm = props => {
    return (
        <div>
            <p className="formMessage" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
            <form onSubmit={props.handleUpdate}>
                <div><span className="currentInfo">
                    {props.updatedItemInfo.brand}</span><br/>
                    <span className="updateInfo"><label htmlFor='brand'>{props.brand}</label></span>
                <p><input type="text" name="brand" placeholder="Update Brand" onChange={props.handleChange} maxLength="15" required/></p></div>
                
                <div><span className="currentInfo">
                    {props.updatedItemInfo.title}</span><br/>
                    <span className="updateInfo"><label htmlFor='title'>{props.title}</label></span>
                <p><input type="text" name="title" placeholder="Update Title" onChange={props.handleChange} maxLength="50" required/></p></div>
                
                <div><span className="currentInfo">
                    {props.updatedItemInfo.condition}/10</span><br/>
                    <span className="updateInfo"><label htmlFor='condition'>{props.condition}/10</label></span>
                <p><input type="number" name="condition" placeholder="Update Condition" onChange={props.handleChange} min="0" max="10" required/></p></div>
                
                <div><span className="currentInfo">
                    {props.updatedItemInfo.size}</span><br/>
                    <span className="updateInfo"><label htmlFor='size'>{props.size}</label></span>
                <p><input type="number" name="size" placeholder="Update Size" onChange={props.handleChange} min="0" max="20" required/></p></div>
                
                {(props.updatedItemInfo.purchasedfor === 0) ? <p></p> : <div><span className="currentInfo">
                    Previously purchased for? ${props.updatedItemInfo.purchasedfor}</span><br/>
                    <span className="updateInfo"><label htmlFor='purchasedfor'>${props.purchasedfor}</label></span>
                <p><input type="number" name="purchasedfor" placeholder="Update Purchase Price" onChange={props.handleChange} /></p></div> }
                
                {(props.updatedItemInfo.purchasedfrom === '') ? <p></p> : <div><span className="currentInfo">
                    Previously purchased from? {props.updatedItemInfo.purchasedfrom}</span><br/>
                    <span className="updateInfo"><label htmlFor='purchasedfrom'>{props.purchasedfrom}</label></span>
                <p><input type="text" name="purchasedfrom" placeholder="Update Purchased From" onChange={props.handleChange} /></p></div> }
                
                {(props.updatedItemInfo.worth === 0) ? <p></p> : <div><span className="currentInfo">
                    Current: ${props.updatedItemInfo.worth}</span><br/>
                    <span className="updateInfo"><label htmlFor='worth'>${props.worth}</label></span>
                <p><input type="number" name="worth" placeholder="Update Sneaker Worth" onChange={props.handleChange} /></p></div> }
                
                {(props.updatedItemInfo.image === '') ? <p></p> : <div><span className="currentInfo">
                    Current Image</span><br/>
                    <img src={props.updatedItemInfo.image} alt={props.updatedItemInfo.title} className="updateImage" /><br/>
                    <span className="updateInfo"><label htmlFor='image'>New Image</label></span><br/>
                    <img src={props.image} alt={props.title} className="updateImage" />
                <p><input type="url" name="image" placeholder="Update Image" onChange={props.handleChange} /></p></div> }
                
                {(props.updatedItemInfo.forsale === '') ? <p></p> : <div><span className="currentInfo">
                    Previously for sale? {props.updatedItemInfo.forsale}</span><br/>
                    <span className="updateInfo"><label htmlFor='forsale'>Now, I guess its for sale? {props.forsale}</label></span>
                <p><select name="forsale" onChange={props.handleChange}>
                <option defaultValue="change">Change Me</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select></p></div> }
                <input type="submit" value="Update Item" /> <input type="reset" value="Reset" />
            </form>
        </div>
    );
}

export default UpdateItemForm;