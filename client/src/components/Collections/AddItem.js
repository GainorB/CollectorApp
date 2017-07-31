import React, { Component } from 'react';
import axios from 'axios';

import AddItemForm from './AddItemForm';
const link = 'http://localhost:3000/';

class AddItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            category: '',
            brand: '',
            title: '',
            condition: 0,
            size: 0,
            purchasedfor: 0,
            purchasedfrom: '',
            worth: 0,
            forsale: '',
            image1: '',
            image2: '',
        }

        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    // RESET MESSAGES ON THE FORM
    clearMessage(){
        this.setState({ message: '' });
    }

    // HANDLE ADDING NEW ITEMS
    handleNewItem(e){
        e.preventDefault();

        const { category, brand, title, condition, size, purchasedfor, purchasedfrom,
                worth, forsale, image1, image2 } = this.state;

        const { token } = this.props;

        const endpoint = link + 'collections/' + this.props.user.id + '/new/';
        
        axios({
            method: 'POST',
            url: endpoint,
            data: {
                category, brand, title, condition, size, purchasedfor, purchasedfrom,
                worth, forsale, image1, image2
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => this.setState({ message: res.data.message }))
        .catch(err => console.log(err));
    }

    // HANDLE INPUT FROM FORM ELEMENTS
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        return (
            <AddItemForm 
                handleNewItem={this.handleNewItem}
                handleChange={this.handleChange}
                clearMessage={this.clearMessage}
                message={this.state.message}
            />
        );
    }
}

export default AddItem;