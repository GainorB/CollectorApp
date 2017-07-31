import React, { Component } from 'react';

class Collection extends Component {
    componentDidMount(){
        this.props.fetchMyCollection(this.props.user.id, this.props.token);
    }

    render(){
        const { collection } = this.props;
        return (
            <div>
            {collection.map((element, index) => {
                return (
                    <p key={index}>
                        {element.category}
                    </p>
                );
            })}
            </div>
        );
    }
}

export default Collection;