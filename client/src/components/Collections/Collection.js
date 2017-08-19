import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import dragula from 'react-dragula';
import ReactDOM from 'react-dom';

class Collection extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderCollection = this.renderCollection.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        this.props.fetchMyCollection(this.props.user.id, this.props.token);

        var sneakers = ReactDOM.findDOMNode(this.refs.sneakers);
        dragula([sneakers]);
        this.props.clearMessage();
    }

    handleClick(e){
        document.querySelectorAll('.hidden')[e.target.id].classList.toggle('show');
        this.props.clearMessage();
    }

    handleSearch(e){
        let search = e.target.value.toUpperCase();

        let titles = [].slice.call(document.querySelectorAll('.cTitle'));

        for(let i = 0; i < titles.length; i++){
            if(titles[i].innerText.toUpperCase().indexOf(search) > -1){
                titles[i].parentNode.parentNode.parentNode.style.display = '';
            } else {
                titles[i].parentNode.parentNode.parentNode.style.display = 'none';
            }
        }

        this.props.clearMessage();
    }

    handleReduce(e){
        if(e.target.getAttribute('class') === 'fa fa-minus'){
            e.target.setAttribute('class', 'fa fa-plus');
            e.target.parentNode.querySelector('.minimizedTitle').innerHTML = e.target.parentNode.querySelector('img').getAttribute('alt');
            e.target.parentNode.style.height = '50px';
            e.target.parentNode.querySelector('img').style.display = 'none';
            e.target.parentNode.querySelector('.hidden').style.display = 'none';
        } else {
            e.target.setAttribute('class', 'fa fa-minus');
            e.target.parentNode.querySelector('.minimizedTitle').innerHTML = '';
            e.target.parentNode.style.height = '';
            e.target.parentNode.querySelector('img').style.display = '';
            e.target.parentNode.querySelector('.hidden').style.display = '';
        }

        this.props.clearMessage();
    }

    handleUpdate(id){
        return this.props.updateAnItem(id);
    }

    renderCollection(){
        const { collection } = this.props;
        if(this.props.apiDataLoaded === true) {
            return (
                <div className="wrapper" ref="sneakers">
                    {collection.map((element, index) => {
                        return (
                                <div className="boxbox" key={index}>
                                    <i className="fa fa-times" aria-hidden="true" onClick={() => this.props.handleDelete(element.id)}></i>
                                    <i className="fa fa-minus" aria-hidden="true" onClick={this.handleReduce} ></i>
                                    <p className="minimizedTitle"></p>
                                    <div><img id={index} src={element.image} alt={element.title} onClick={this.handleClick} /></div>
                                        <div className="hidden">
                                        <p><span className="cTitle">{element.brand} {element.title}</span></p><br/>
                                        <span className="cInfo">
                                        <p>Condition: {element.condition}/<strong>10</strong></p>
                                        <p>Size: <strong>{element.size}</strong></p>
                                        
                                        {(element.purchasedfor === 0) ? <p></p> : <p>Purchased For: <strong>${element.purchasedfor}</strong></p> }
                                        {(element.purchasedfrom === '') ? <p></p> : <p>Purchased From: <strong>{element.purchasedfrom}</strong></p> }
                                        {(element.worth === 0) ? <p></p> : <p>Worth? <strong>${element.worth}</strong></p> }
                                        {(element.forsale === '') ? <p></p> : <p>For Sale? <strong>{element.forsale}</strong></p> }
                                        <br/><p><span className="cDate">{element.date_added}</span></p>
                                        </span>
                                        <Link className="updateCollection" to="/update" onClick={() => this.handleUpdate(element.id)}>Update {element.brand} {element.title}?</Link>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            );
        } else {
            return (
                <div className="loading">
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/a3/dd/08/a3dd083f4e57a8629e1e9de3a9f5a630.gif" alt="Loading"/>
                </div>
            );
        }
    }

    render(){
        return (
            <div className="animated bounceInLeft collectionPage">
                <p className="search"><input type="text" name="search" placeholder="Search" onChange={this.handleSearch} /></p>
                <p className="formMessage" style={{ display: this.props.message !== '' ? "block" : "none" }}>{this.props.message}</p>
                {this.renderCollection()}
            </div>
        );
    }
}

export default Collection;