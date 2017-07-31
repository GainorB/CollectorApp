import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Collection from './components/Collections/Collection';
import AddItem from './components/Collections/AddItem';

import './App.css';

const link = 'http://localhost:3000/';

class App extends Component {
  constructor(props){
    super(props);

    // INITIAL STATE
    this.state = {
      user: null,
      isLoggedIn: false,
      token: null,
      collection: []
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
  }

  // GRAB TOKEN AND USERID FROM LOCALSTORAGE
  // IF TOKEN IS AVAILABLE SET STATE (LOG IN THE USER), THEN FETCH PROFILE INFO
  componentDidMount(){
    let token = localStorage.getItem('collectionApp-token');
    let userID = localStorage.getItem('collectionApp-userID');
    if(token){
      this.setState({ token, isLoggedIn: true });
      this.fetchProfile(userID, token);
    }
  }

  // FETCH PROFILE FROM LOCAL STORAGE
  // WHEN PAGE REFRESHES AND STATE IS LOST, WE FETCH THE PROFILE FROM LOCAL STORAGE
  fetchProfile(userID, token){

    const endpoint = link + 'users/profile/' + userID;

    axios.get(endpoint, { 
      headers: {
        Authorization: token
      },
      id: userID 
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
      const endpoint = link + `collections/mine/` + id;
      axios.get(endpoint, {
          headers: {
              Authorization: token
          },
          id
      })
      .then(collection => {
          this.setState({ collection: collection.data.collection });
      })
      .catch(err => console.error(err));
  }

  // USER LOGS OUT
  // REMOVE TOKEN AND USERID FROM LOCAL STORAGE
  logOut(){
    console.log("logged out");
    localStorage.removeItem('collectionApp-token');
    localStorage.removeItem('collectionApp-userID');
    // RESET STATE
    this.setState({ user: null, isLoggedIn: false, token: null });
  }

  // MY
  collectionComponent(){
    const { token, isLoggedIn, user } = this.state;
    return (
      <Collection
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        fetchMyCollection={this.fetchMyCollection}
        collection={this.state.collection}
      />
    );
  }

  // HOME
  homeComponent(){
    const { token, isLoggedIn, user } = this.state;
    return (
      <Home 
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
      />
    );
  }

  // REGISTER
  newComponent(){
    return (
      <Register 
        setUser={this.setUser}
      />
    );
  }

  // LOGIN
  loginComponent(){
    return (
      <Login 
        setUser={this.setUser}
      />
    );
  }

  // ADD ITEM
  addComponent(){
    const { token, isLoggedIn, user } = this.state;
    return (
    <AddItem 
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
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
      <h3>No match for <code>{location.pathname}</code></h3>
    );
  }

  render() {
    const { token, isLoggedIn } = this.state;
    return (
        <Router>
          <div>
            <Navbar token={token} isLoggedIn={isLoggedIn} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/new" render={() => this.requireAuth("/new")} />
              <Route path="/login" render={() => this.requireAuth("/login")} />
              <Route path="/my" render={() => this.requireAuth("/my")} /> 
              <Route path="/add" render={() => this.requireAuth("/add")} /> 
              <Route component={this.NoMatch}/>
            </Switch>
          </div>
        </Router>
      );
    }
  }

export default App;