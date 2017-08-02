import React, { Component } from 'react';

class Collection extends Component {
    componentDidMount(){
        this.props.fetchMyCollection(this.props.user.id, this.props.token);
    }

    handleClick(e){
        document.querySelectorAll('.hidden')[e.target.id].classList.toggle('show');
    }

    render(){
        const { collection } = this.props;
        return (
            <div id="collection">
                {collection.map((element, index) => {
                    return (
                        <div key={index}>
                            <div className="boxbox">
                                <p><span className="cTitle">{element.brand} {element.title}</span></p>
                                <p><span className="cInfo">Category: {element.category}</span></p>
                                <p><span className="cInfo">Condition: {element.condition}/10</span></p>
                                <p><span className="cInfo">Size: {element.size}</span></p>
                                <p><i id={index} className="fa fa-info-circle" aria-hidden="true" onClick={this.handleClick}></i></p>
                                
                                <br/><p className="hidden">
                                    <p><img src={element.image}/></p>
                                    <span className="cInfo">
                                        {(element.purchasedfor === 0) ? <p></p> : <p>Purchased For: ${element.purchasedfor}</p> }
                                        {(element.purchasedfrom === '') ? <p></p> : <p>Purchased From: {element.purchasedfrom}</p> }
                                        {(element.worth === 0) ? <p></p> : <p>Worth? ${element.worth}</p> }
                                        {(element.forsale === '') ? <p></p> : <p>For Sale? {element.forsale}</p> }
                                        <br/><p><span className="cDate">Date Added: {element.date_added}</span></p>
                                    </span>
                                </p>
                            </div>
                        </div>
                        );
                    })}
            </div>
        );
    }
}

export default Collection;