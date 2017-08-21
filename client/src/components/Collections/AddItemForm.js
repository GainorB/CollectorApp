import React from 'react';

let clicked = false;

const AddItemForm = props => {

    const handleClick = (e) => {

        if(clicked === false) {
            clicked = true;
            e.target.innerHTML = 'less options?';
        } else {
            clicked = false;
            e.target.innerHTML = 'more options?';
        }

        document.querySelector('.hidden').classList.toggle('show');
    }

    return (
        <div className="AddItemForm">
            <p className="formTitle">New sneaker</p>
            <p className="formSubTitle">Input as many details about your sneaker as possible.</p>
            <p className="formMessage" style={{ display: props.message !== '' ? "block" : "none" }}>{props.message}</p>
                <form onSubmit={props.handleNewItem}>

                    <p>
                    <span className="tooltip">Brand</span><br/>
                    <input type="text" name="brand" onBlur={props.handleChange} maxLength="15" required/></p>

                    <p>
                    <span className="tooltip">Name of your sneakers</span><br/>
                    <input type="text" name="title" onBlur={props.handleChange} maxLength="50" required/></p>

                    <p>
                    <span className="tooltip">Condition of your sneakers? Out of 10</span><br/>
                    <input type="number" name="condition" onBlur={props.handleChange} min="0" max="10" required/></p>

                    <p>
                    <span className="tooltip">What size are your sneakers?</span><br/>
                    <input type="number" name="size" id="size" onBlur={props.handleChange} min="0" max="20" required/></p>

                    <p>
                    <span className="tooltip">Insert an image URL for your sneaker</span><br/>
                    <input type="url" name="image" onChange={props.handleChange} required/></p>

                    {(props.image === '') ? <p></p> : <p><img src={props.image} className="updateImage" alt={props.title} /></p>}

                    <p className="formTitle moreOpt" onClick={(e) => handleClick(e)}>more options?</p><br/>
                    
                    <div className="hidden">
                        <p>
                        <span className="tooltip">How much did you spend? ($)</span><br/>
                        <input type="number" name="purchasedfor" onBlur={props.handleChange} /></p>

                        <p>
                        <span className="tooltip">Where did you purchase from?</span><br/>
                        <input type="text" name="purchasedfrom" onBlur={props.handleChange} /></p>

                        <p>
                        <span className="tooltip">Sneakers are worth? ($)</span><br/>
                        <input type="number" name="worth" onBlur={props.handleChange} /></p>

                        <p><span className="tooltip">For sale?</span><br/>
                        <select name="forsale" onChange={props.handleChange}>
                        <option defaultValue="change">Change Me</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select></p>
                    </div>
                    <input type="submit" value="create" /> <input type="reset" value="reset" />
                </form>
        </div>
    );
}

export default AddItemForm;