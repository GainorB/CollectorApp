import React from 'react';

let clicked = false;

const AddItemForm = props => {

const handleClick = (e) => {

    if(clicked === false) {
        clicked = true;
        e.target.innerHTML = 'Less Options?';
    } else {
        clicked = false;
        e.target.innerHTML = 'More Options?';
    }

    document.querySelector('.hidden').classList.toggle('show');
}

    return (
        <div className="AddItemForm">
            <p className="formTitle">Required</p>
            <p className="formSubTitle">Input as many details about your sneaker as possible.</p>
            <p className="formMessage" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
                <form onSubmit={props.handleNewItem}>

                    <p>
                    <span className="tooltip">Select a brand for your listing.</span><br/>
                    <input type="text" name="brand" onBlur={props.handleChange} maxLength="15" required/></p>

                    <p>
                    <span className="tooltip">Select a title for your listing.</span><br/>
                    <input type="text" name="title" onBlur={props.handleChange} maxLength="50" required/></p>

                    <p>
                    <span className="tooltip">Condition of your item? Out of 10.</span><br/>
                    <input type="number" name="condition" onBlur={props.handleChange} min="0" max="10" required/></p>

                    <p>
                    <span className="tooltip">What size is your item?</span><br/>
                    <input type="number" name="size" onBlur={props.handleChange} min="0" max="20" required/></p>

                    <p>
                    <span className="tooltip">Insert an image URL for your sneaker</span><br/>
                    <input type="url" name="image" onChange={props.handleChange} required/></p>

                    {(props.image === '') ? <p></p> : <p><img src={props.image} className="updateImage" alt={props.title} /></p>}

                    <p className="formTitle moreOpt" onClick={(e) => handleClick(e)}>More Options?</p><br/>
                    
                    <div className="hidden">
                        <p>
                        <span className="tooltip">How much did you spend on your item? ($)</span><br/>
                        <input type="number" name="purchasedfor" onBlur={props.handleChange} /></p>

                        <p>
                        <span className="tooltip">Where did you purchase from?</span><br/>
                        <input type="text" name="purchasedfrom" onBlur={props.handleChange} /></p>

                        <p>
                        <span className="tooltip">How much do you think your item is worth? ($)</span><br/>
                        <input type="number" name="worth" onBlur={props.handleChange} /></p>

                        <p><span className="tooltip">For sale?</span><br/>
                        <select name="forsale" onChange={props.handleChange}>
                        <option defaultValue="change">Change Me</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select></p>
                    </div>
                    <input type="submit" value="new item" /> <input type="reset" value="reset" />
                </form>
        </div>
    );
}

export default AddItemForm;