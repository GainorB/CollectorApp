import React from 'react';

const AddItemForm = props => {

const handleClick = () => {
    document.querySelector('.hidden').classList.toggle('show');
}

    return (
        <div className="AddItemForm">
            <p className="formMessage" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
                <form onSubmit={props.handleNewItem}>
                    <p className="formTitle">Required</p>

                    <div><p className="tooltip"><label htmlFor='brand'>Select a brand for your listing.</label></p>
                    <input type="text" name="brand" onChange={props.handleChange} maxLength="15" required/></div>

                    <div><p className="tooltip"><label htmlFor='title'>Select a title for your listing.</label></p>
                    <input type="text" name="title" onChange={props.handleChange} maxLength="50" required/></div>

                    <div><p className="tooltip"><label htmlFor='condition'>Condition of your item? Out of 10.</label></p>
                    <input type="number" name="condition" onChange={props.handleChange} min="0" max="10" required/></div>

                    <div><p className="tooltip"><label htmlFor='size'>What size is your item?</label></p>
                    <input type="number" name="size" onChange={props.handleChange} min="0" max="20" required/></div>

                    <div className="formTitle moreOpt" onClick={() => handleClick()}>More Options?</div>
                    
                    <div className="hidden">
                        <div><p className="tooltip"><label htmlFor='purchasedfor'>How much did you spend on your item?</label></p>
                        <input type="number" name="purchasedfor" onChange={props.handleChange} /></div>

                        <div><p className="tooltip"><label htmlFor='purchasedfrom'>Where did you purchase from?</label></p>
                        <input type="text" name="purchasedfrom" onChange={props.handleChange} /></div>

                        <div><p className="tooltip"><label htmlFor='worth'>How much do you think your item is worth?</label></p>
                        <input type="number" name="worth" onChange={props.handleChange} /></div>

                        <div><p className="tooltip"><label htmlFor='image'>Want to include an image? Insert the URL</label></p>
                        <input type="url" name="image" onChange={props.handleChange} /></div>

                        <div><p className="tooltip"><label htmlFor='forsale'>For sale?</label></p>
                        <select name="forsale" onChange={props.handleChange}>
                        <option defaultValue="change">Change Me</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select></div>
                    </div>
                    <input type="submit" value="new item" /> <input type="reset" value="reset" />
                </form>
        </div>
    );
}

export default AddItemForm;