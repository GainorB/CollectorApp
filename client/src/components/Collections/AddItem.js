import React, { Component } from 'react';
import axios from 'axios';
import AddItemForm from './AddItemForm';

class AddItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            brand: '',
            title: '',
            condition: 0,
            size: 0,
            purchasedfor: 0,
            purchasedfrom: '',
            worth: 0,
            forsale: '',
            image: '',
            message: ''
        }

        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // HANDLE ADDING NEW ITEMS
    handleNewItem(e){
        e.preventDefault();

        const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image } = this.state;

        const { token } = this.props;
        // eslint-disable-next-line
        const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'collections/' + this.props.user.id + '/new/';
        
        axios({
            method: 'POST',
            url: endpoint,
            data: {
                brand, title, condition, size, purchasedfor, purchasedfrom,
                worth, forsale, image
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => {
            this.props.newCollectionData(res.data.collection);
            this.setState({ message: res.data.message })
        })
        .catch(err => console.log(err));

        setTimeout(function() { document.getElementsByTagName('body')[0].scrollTop = 0; }, 2000);
        document.querySelector('form').reset();
    }

    // HANDLE INPUT FROM FORM ELEMENTS
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    // preventNeg = () => {
    //     // PREVENT NEGATIVE NUMBERS IN THE NUMBER INPUT
    //     document.querySelector('#size').addEventListener('keydown', function(e){
    //         if(!((e.keyCode > 95 && e.keyCode < 106)
    //         || (e.keyCode > 47 && e.keyCode < 58) 
    //         || e.keyCode == 8)) {
    //             return false;
    //         }
    //     });
    // }

    render(){
        return (
            <div className="animated bounceInDown">
                <AddItemForm 
                    handleNewItem={this.handleNewItem}
                    handleChange={this.handleChange}
                    message={this.state.message}
                    image={this.state.image}
                    title={this.state.title}
                />
            </div>
        );
    }
}

export default AddItem;