import React, { Component } from 'react';
import axios from 'axios';
import UpdateItemForm from './UpdateItemForm'

class UpdateItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            brand: '',
            title: '',
            condition: '',
            size: '',
            purchasedfor: '',
            purchasedfrom: '',
            worth: '',
            forsale: '',
            image: '',
            message: ''
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleUpdate(e){
        const userID = this.props.user.id;
        const postID = this.props.itemToUpdate;
        const token = this.props.token;

        const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image } = this.state;
        const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'collections/' + userID + '/update/' + postID;
        
        axios({
            method: 'PUT',
            url: endpoint,
            data: { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image },
            headers: { 'Content-Type': 'application/json', 'Authorization': token }, 
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => console.error(err));
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    // RESET MESSAGES ON THE FORM
    clearMessage(){
        this.setState({ message: '' });
    }

    render(){
        return (
            <div className="UpdateWrapper">
                <UpdateItemForm 
                    updatedItemInfo={this.props.updatedItemInfo}
                    handleUpdate={this.handleUpdate}
                    handleChange={this.handleChange}
                    clearMessage={this.clearMessage}
                    message={this.state.message}
                    {...this.state}
                />
            </div>
        );
    }
}

export default UpdateItem;