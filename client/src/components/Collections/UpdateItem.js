import React, { Component } from 'react';
import axios from 'axios';

class UpdateItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: undefined,
            title: undefined,
            condition: undefined,
            size: undefined,
            purchasedfor: undefined,
            purchasedfrom: undefined,
            worth: undefined,
            image: undefined,
            forsale: undefined,
            message: ''
        };

        // BINDING
        this.handleChange = this.handleChange.bind(this);
        this.CheckForEmpty = this.CheckForEmpty.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.checkStateForUndefineds = this.checkStateForUndefineds.bind(this);
        this.inputFlag = true;
    }

    // SETS THE DEFAULT VALUE IN THE INPUT FORM
    componentDidUpdate(){
        const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, image, forsale } = this.props.updatedItemInfo;
        if (this.inputFlag)
	    {
	        this.inputFlag = false;
            this.refs.brand.value = brand;
            this.refs.title.value = title;
            this.refs.condition.value = condition;
            this.refs.size.value = size;
            this.refs.image.value = image;

        if(this.props.updatedItemInfo.purchasedfor !== 0) this.refs.purchasedfor.value = purchasedfor;
        if(this.props.updatedItemInfo.purchasedfrom !== '') this.refs.purchasedfrom.value = purchasedfrom;
        if(this.props.updatedItemInfo.worth !== 0) this.refs.worth.value = worth;
        if(this.props.updatedItemInfo.forsale !== '') this.refs.forsale.value = forsale;
        
        this.checkStateForUndefineds();
	    }
    }

    // ENDPOINT FOR UPDATING AN ITEMS DETAILS
    handleUpdate = (e) => {
        // PREVENT PAGE FROM RELOADING
        e.preventDefault();
        // BEFORE SUBMITTING, CHECKS IF ANY FIELDS ARE UNDEFINED THEN SETS TO DEFAULT VALUE
        this.checkStateForUndefineds();

        const { itemToUpdate, token } = this.props;
        const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image } = this.state;
        
        // eslint-disable-next-line
        const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'collections/' + this.props.user.id + '/update/' + itemToUpdate;
        
        axios({
            method: 'PUT',
            url: endpoint,
            data: { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image },
            headers: { 'Content-Type': 'application/json', 'Authorization': token }, 
        })
        .then(res => {
            this.props.newCollectionData(this.props.shuffle(res.data.collection));
            this.setState({ message: res.data.message })})
        .catch(err => console.error(err));

        setTimeout(function() { document.getElementsByTagName('body')[0].scrollTop = 0; }, 2000);
    }

    // HELPER METHOD THAT CHECKS STATE FOR UNDEFINED VALUES
    checkStateForUndefineds = () => {
        const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, image, forsale } = this.props.updatedItemInfo;
        
        if(this.state.brand === undefined) this.setState({ brand });
        if(this.state.title === undefined) this.setState({ title }); 
        if(this.state.condition === undefined) this.setState({ condition });
        if(this.state.size === undefined) this.setState({ size });
        if(this.state.purchasedfor === undefined) this.setState({ purchasedfor });
        if(this.state.purchasedfrom === undefined) this.setState({ purchasedfrom });
        if(this.state.worth === undefined) this.setState({ worth });
        if(this.state.image === undefined) this.setState({ image });
        if(this.state.forsale === undefined) this.setState({ forsale });
    }

    // EVENT HANDLER FOR UPDATING STATE BASED ON INPUT FIELDS
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.CheckForEmpty();
    }

    // IF THE INPUT FIELD IS EMPTY IT WILL FILL IT IN WITH DEFAULT VALUE
    CheckForEmpty = () => {
        const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, image, forsale } = this.props.updatedItemInfo;
        
        if(this.refs.brand.value === '') {
            this.refs.brand.value = brand;
            this.setState({ brand }); 
        }

        if(this.refs.title.value === ''){
            this.refs.title.value = title; 
            this.setState({ title }); 
        }

        if(this.refs.condition.value === ''){
            this.refs.condition.value = condition;
            this.setState({ condition });
        }

        if(this.refs.size.value === ''){
            this.refs.size.value = size; 
            this.setState({ size });
        }

        if(this.refs.image.value === ''){
            this.refs.image.value = image; 
            this.setState({ image });
        }

        // optional

        if(this.props.updatedItemInfo.purchasedfor !== 0) {
            if(this.refs.purchasedfor.value === ''){ 
                this.refs.purchasedfor.value = purchasedfor;
                this.setState({ purchasedfor });
            }
        }

        if(this.props.updatedItemInfo.purchasedfrom !== ''){
            if(this.refs.purchasedfrom.value === ''){
                this.refs.purchasedfrom.value = purchasedfrom;
                this.setState({ purchasedfrom }); 
            }
        }

        if(this.props.updatedItemInfo.worth !== 0){
            if(this.refs.worth.value === ''){
                this.refs.worth.value = worth;
                this.setState({ worth });
            }
        }

        if(this.props.updatedItemInfo.forsale !== ''){
            if(this.refs.forsale.value === ''){
                this.refs.forsale.value = forsale;
                this.setState({ forsale });
            }
        }
    }
    
    render(){
        return (
            <div className="updateWrapper">
                <p className="formTitle">Update sneaker</p>
                <p className="formSubTitle">Whichever field isn't updated or left blank will default to its original value.</p>
                <p className="formMessage" style={{ display: this.state.message !== '' ? "block" : "none" }}>{this.state.message}</p>
                <form onSubmit={this.handleUpdate}>

                    <p><span className="tooltip">Brand</span><br/>
                    <input type="text" 
                        ref="brand"
                        name="brand"
                        onBlur={this.handleChange}
                        /></p>

                    <p><span className="tooltip">Name</span><br/>
                    <input type="text" 
                        ref="title"
                        name="title"
                        onBlur={this.handleChange}
                        /></p>

                    <p><span className="tooltip">Condition</span><br/>
                    <input type="number" 
                        ref="condition"
                        name="condition"
                        max="10"
                        min="0"
                        onBlur={this.handleChange}
                        /></p>

                    <p><span className="tooltip">Size</span><br/>
                    <input type="number" 
                        ref="size"
                        name="size"
                        max="15"
                        min="3"
                        onBlur={this.handleChange}
                        /></p>
                    
                    {(this.props.updatedItemInfo.purchasedfor === 0) ? <p></p> : <p><span className="tooltip">Purchased For ($)</span><br/><input type="number" ref="purchasedfor" name="purchasedfor" onBlur={this.handleChange} /></p> }
                    
                    {(this.props.updatedItemInfo.purchasedfrom === '') ? <p></p> : <p><span className="tooltip">Purchased From</span><br/><input type="text" ref="purchasedfrom" name="purchasedfrom" onBlur={this.handleChange} /></p> }
                    
                    {(this.props.updatedItemInfo.worth === 0) ? <p></p> : <p><span className="tooltip">Worth ($)</span><br/><input type="number" ref="worth" name="worth" onBlur={this.handleChange} /></p> }
                    
                    <p>
                        <span className="tooltip">Current Image</span><br/>
                        <img src={this.props.updatedItemInfo.image} alt={this.props.updatedItemInfo.title} className="updateImage" /><br/><br/>
                        <span className="tooltip">New Image</span><br/>
                        <img src={this.state.image} alt={this.state.title} className="updateImage" /><br/>
                        <input type="url" ref="image" name="image" onBlur={this.handleChange} />
                    </p>
                    
                    {(this.props.updatedItemInfo.forsale === '') ? <p></p> : 
                    <p><span className="tooltip">For Sale</span><br/>
                    <select ref="forsale" name="forsale" onChange={this.handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    </p> }
                    <input type="submit" value="update" /> <input type="reset" value="reset" />
                </form>
            </div>
        );
    }
}

export default UpdateItem;