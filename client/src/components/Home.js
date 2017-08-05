import React from 'react';

const Home = (props) => {
    if(props.isLoggedIn === false) {
        return (
            <div className="Home">
                <p>Welcome to Collector!</p>
                <p>Use this application to keep track of your sneaker collection.</p>
                <p>Your collection is visually displayed in a neat way that is easy on your eyes!</p>
                <p>Lastly, you can share your profile with friends so they can see what heat you have!</p>
            </div>
        );
    } else {
        return (
            <div className="Home">
                <p>Welcome to {props.user} Collector!</p>
                <p>Use this application to keep track of your sneaker collection.</p>
                <p>Your collection is visually displayed in a neat way that is easy on your eyes!</p>
                <p>Lastly, you can share your profile with friends so they can see what heat you have!</p>
            </div>
        );
    }
}

export default Home;