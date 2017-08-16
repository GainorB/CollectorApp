import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Collection from './components/Collections/Collection';
import AddItem from './components/Collections/AddItem';
import UpdateItem from './components/Collections/UpdateItem'
import Footer from './components/Footer';

// CSS
import './css/style.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      link: 'https://collectorapp-api.herokuapp.com/',
      user: null,
      isLoggedIn: false,
      token: null,
      collection: [],
      itemToUpdate: 0,
      updatedItemInfo: {}
    }

    // BINDING
    this.setUser = this.setUser.bind(this);
    this.requireAuth = this.requireAuth.bind(this);
    this.collectionComponent = this.collectionComponent.bind(this);
    this.homeComponent = this.homeComponent.bind(this);
    this.loginComponent = this.loginComponent.bind(this);
    this.newComponent = this.newComponent.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
    this.fetchMyCollection = this.fetchMyCollection.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    this.updateAnItem = this.updateAnItem.bind(this);
    this.logOut = this.logOut.bind(this);
    this.newCollectionData = this.newCollectionData.bind(this);
  }

  // GRAB TOKEN AND USERID FROM LOCALSTORAGE
  // IF TOKEN IS AVAILABLE SET STATE (LOG IN THE USER), THEN FETCH PROFILE INFO
  componentDidMount(){
    let token = localStorage.getItem('collectionApp-token');
    let userID = localStorage.getItem('collectionApp-userID');

    // IF TOKEN EXISTS
    if(token){
      this.setState({ token, isLoggedIn: true });
      this.fetchProfile(userID, token);
    }
  }

  // THIS FUNCTION GETS CALLED IN COLLECTION COMPONENT
  // GETS PASSED AN ID, FROM THERE SETS STATE OF THE ITEM TO UPDATE
  // FETCH THIS ITEM FROM DATABASE AND SEND IT TO UPDATE ITEM PAGE TO CHANGE DETAILS
  updateAnItem(id){

    const { token, user } = this.state;

    this.setState({ itemToUpdate: id });
    // eslint-disable-next-line
    const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'collections/' + user.id + '/update/info/' + id;

    axios({
      method: 'GET',
      url: endpoint,
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
    })
    .then(updated => {
      this.setState({ updatedItemInfo: updated.data.info }); 
    })
    .catch(err => console.error(err));
  }

  // FETCH PROFILE FROM LOCAL STORAGE
  // WHEN PAGE REFRESHES AND STATE IS LOST, WE FETCH THE PROFILE FROM LOCAL STORAGE
  fetchProfile(userID, token){
    // eslint-disable-next-line
    const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'users/profile/' + userID;

    axios({
      method: 'GET',
      url: endpoint,
      data: { id: userID },
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      })
      .then(user => {
        this.setState({ user: user.data.user });
      })
      .catch(err => console.error(err));
  }

  // ONCE A USER LOGS IN
  // ADD TOKEN AND USERID TO LOCAL STORAGE
  setUser(user){
    localStorage.setItem('collectionApp-token', user.data.token);
    localStorage.setItem('collectionApp-userID', user.data.user.id);
    // FETCH COLLECTION
    this.fetchMyCollection(user.data.user.id, user.data.token);
    this.setState({ user: user.data.user, isLoggedIn: true, token: user.data.token });
  }

  // FETCH MY COLLECTION FROM DATABASE
  fetchMyCollection(id, token){
      // eslint-disable-next-line
      const endpoint = 'https://collectorapp-api.herokuapp.com/' + `collections/mine/` + id;
      // const endpoint = this.state.link + 'collections/' + id + '/mine/';
      axios.get(endpoint, {
          headers: {
              Authorization: token
          }
      })
      .then(collection => {
          this.setState({ collection: collection.data.collection });
      })
      .catch(err => console.error(err));
  }

  // USER LOGS OUT
  // REMOVE TOKEN AND USERID FROM LOCAL STORAGE
  logOut(){
    localStorage.removeItem('collectionApp-token');
    localStorage.removeItem('collectionApp-userID');
    // RESET STATE
    this.setState({ user: null, isLoggedIn: false, token: null });
  }

  newCollectionData(data){
    return this.setState({ collection: data });
  }

  // MY
  collectionComponent(){
    const { token, isLoggedIn, user, collection, link } = this.state;
    return (
      <Collection
        link={link}
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        fetchMyCollection={this.fetchMyCollection}
        collection={collection}
        updateAnItem={this.updateAnItem}
        newCollectionData={this.newCollectionData}
      />
    );
  }

  // HOME
  homeComponent(){
    const { token, isLoggedIn, user, link } = this.state;
    return (
      <Home
        link={link} 
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        fetchProfile={this.fetchProfile}
      />
    );
  }

  // REGISTER
  newComponent(){
    return (
      <Register
        link={this.state.link} 
        setUser={this.setUser}
      />
    );
  }

  // LOGIN
  loginComponent(){
    return (
      <Login
        link={this.state.link} 
        setUser={this.setUser}
      />
    );
  }

  // ADD ITEM
  addComponent(){
    const { token, isLoggedIn, user, link } = this.state;
    return (
    <AddItem
        link={link} 
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        newCollectionData={this.newCollectionData}
      />
    );
  }

  // UPDATE ITEM
  updateComponent(){
    const { token, isLoggedIn, user, updatedItemInfo, itemToUpdate, link } = this.state;
    return (
    <UpdateItem
        link={link} 
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        itemToUpdate={itemToUpdate}
        updatedItemInfo={updatedItemInfo}
        newCollectionData={this.newCollectionData}
      />  
    );
  }

  // CHECK IF USER IS AUTHENTICATED
  requireAuth(path){
    const { token, isLoggedIn } = this.state;
    if(isLoggedIn === true || token){
      switch(path){
        case "/my":
          return this.collectionComponent();
        case "/add":
          return this.addComponent();
        case "/update":
          return this.updateComponent();
        default:
          return (<Redirect to="/my" />);
      }
    } else {
      switch(path){
        case "/":
          return this.homeComponent();
        case "/new":
          return this.newComponent();
        case "/login":
          return this.loginComponent();
        default:
          return (<Redirect to="/" />)
      }
    }
  }

  // ERROR PAGE
  NoMatch({location}){
    return (
      <h3>No match for <code>{location.pathname}</code><br/><br/>Return <Link to="/">home.</Link></h3>
    );
  }

  render() {
    const { token, isLoggedIn, itemToUpdate } = this.state;
    return (
        <Router>
          <div>
            <Navbar token={token} isLoggedIn={isLoggedIn} itemToUpdate={itemToUpdate} logOut={this.logOut} />
            <Switch>
              <Route exact path="/" render={() => this.homeComponent()} />
              <Route path="/new" render={() => this.requireAuth("/new")} />
              <Route path="/login" render={() => this.requireAuth("/login")} />
              <Route path="/my" render={() => this.requireAuth("/my")} /> 
              <Route path="/add" render={() => this.requireAuth("/add")} />
              <Route path="/update" render={() => this.requireAuth("/update")} />
              <Route component={this.NoMatch}/>
            </Switch>
            <Footer />
          </div>
        </Router>
      );
    }
  }

export default App;