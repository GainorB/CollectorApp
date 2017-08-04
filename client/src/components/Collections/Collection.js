import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const link = 'http://localhost:3000/';

class Collection extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            minimize: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderCollection = this.renderCollection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        this.props.fetchMyCollection(this.props.user.id, this.props.token);
    }

    handleClick(e){
        document.querySelectorAll('.hidden')[e.target.id].classList.toggle('show');
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
    }

    handleDelete(id){
        const userID = this.props.user.id;
        const endpoint = link + 'collections/' + userID + '/delete/' + id;

        axios.delete(endpoint, {
            headers: { Authorization: this.props.token },
        })
        .then(response => {
            this.setState({ message: response.data.message });
        })
        .catch(err => console.error(err));
    }

    handleReduce(e){
        if(this.state.minimize === false){
            e.target.parentNode.querySelector('.minimizedTitle').innerHTML = e.target.parentNode.querySelector('img').getAttribute('alt');
            e.target.parentNode.style.height = '50px';
            e.target.parentNode.querySelector('img').style.display = 'none';
            e.target.parentNode.querySelector('.hidden').style.display = 'none';
            this.setState({ minimize: !this.state.minimize });
        } else {
            e.target.parentNode.querySelector('.minimizedTitle').innerHTML = '';
            e.target.parentNode.style.height = '';
            e.target.parentNode.querySelector('img').style.display = '';
            e.target.parentNode.querySelector('.hidden').style.display = '';
            this.setState({ minimize: !this.state.minimize });
        }
    }

    handleUpdate(id){
        return this.props.updateAnItem(id);
    }

    renderCollection(){
        const { collection } = this.props;
        return (
            <div className="wrapper">
                {collection.map((element, index) => {
                    return (
                            <div className="boxbox" key={index}>
                                <i className="fa fa-times" aria-hidden="true" onClick={() => this.handleDelete(element.id)}></i>
                                {(this.state.minimize === false) ? <i className="fa fa-minus" aria-hidden="true" onClick={this.handleReduce} ></i> : <i className="fa fa-plus" aria-hidden="true" onClick={this.handleReduce} ></i>}
                                <p className="minimizedTitle"></p>
                                <p><img id={index} src={element.image} alt={element.title} onClick={this.handleClick} /></p>
                                    <p className="hidden">
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
                                    <Link className="updateCollection" to="/update" onClick={() => this.handleUpdate(element.id)}>Update {element.title}?</Link>
                                </p>
                                {/* <i className="fa fa-pencil" aria-hidden="true"}></i> */}
                            </div>
                        );
                    })}
            </div>
        );
    }

    render(){
        return (
            <div className="collectionPage">
                <p className="search"><input type="text" name="search" placeholder="Search" onChange={this.handleSearch} /></p>
                <p id="message" style={{ display: this.state.message !== '' ? "block" : "none" }}>{this.state.message}</p>
                {this.renderCollection()}
            </div>
        );
    }
}

export default Collection;