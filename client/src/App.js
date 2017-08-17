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
      user: null,
      isLoggedIn: false,
      token: null,
      collection: [],
      itemToUpdate: 0,
      updatedItemInfo: {},
      message: '',
      apiDataLoaded: false
    }

    // BINDING
    this.setUser = this.setUser.bind(this);
    this.requireAuth = this.requireAuth.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
    this.fetchMyCollection = this.fetchMyCollection.bind(this);
    this.updateAnItem = this.updateAnItem.bind(this);
    this.logOut = this.logOut.bind(this);
    this.newCollectionData = this.newCollectionData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearMessage = this.clearMessage.bind(this);

    // components
    this.collectionComponent = this.collectionComponent.bind(this);
    this.loginComponent = this.loginComponent.bind(this);
    this.newComponent = this.newComponent.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
  }

  /**
   * Clears the status message from state
   * @memberof App
   */
  clearMessage = () => {
    this.setState({ message: '' });
  }

  /**
   * When component mounts grab token and userid from Local Storage
   * If token and userid exists, log the user in
   * @memberof App
   */
  componentDidMount(){
    let token = localStorage.getItem('collectionApp-token');
    let userID = localStorage.getItem('collectionApp-userID');

    // IF TOKEN EXISTS
    if(token){
      this.setState({ token, isLoggedIn: true });
      this.fetchProfile(userID, token);
    }
  }

  /**
   * This function gets called in Collection.js
   * Gets passed an id, sets state with this id
   * Fetch this item from the database and send it to the update item page
   * @param  {integer} id - the ID of the item to update
   */
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

  /**
   * Fetches users profile
   * @param {integer} userID - id of the user
   * @param {integer} token 
   * @memberof App
   */
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

  /**
   * This function is called when a user logs in
   * Sets two variables in LocalStorage
   * @param {object} user - contains user profile information
   * @memberof App
   */
  setUser(user){
    const userID = user.data.user.id;
    const token = user.data.token;

    localStorage.setItem('collectionApp-token', token);
    localStorage.setItem('collectionApp-userID', userID);
    // FETCH COLLECTION
    this.fetchMyCollection(userID, token);
    this.setState({ user: user.data.user, isLoggedIn: true, token });
  }

  /**
   * Fetch user collection from database
   * @param {integer} id - userid
   * @param {integer} token 
   * @memberof App
   */
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
          this.setState({ collection: this.shuffle(collection.data.collection), apiDataLoaded: true });
      })
      .catch(err => console.error(err));
  }

  /**
   * Delete a sneaker from collection
   * @param {integer} id  - id of sneaker to delete
   * @memberof App
   */
  handleDelete(id){
      const userID = this.state.user.id;
      // eslint-disable-next-line
      const endpoint = 'https://collectorapp-api.herokuapp.com/' + 'collections/' + userID + '/delete/' + id;

      axios.delete(endpoint, {
          headers: { Authorization: this.state.token },
      })
      .then(response => {
          this.newCollectionData(this.shuffle(response.data.collection));
          this.setState({ message: response.data.message });
      })
      .catch(err => console.error(err));
  }

  /**
   * Logout an user by clearing LocalStorage
   * @memberof App
   */
  logOut(){
    localStorage.removeItem('collectionApp-token');
    localStorage.removeItem('collectionApp-userID');
    // RESET STATE
    this.setState({ user: null, isLoggedIn: false, token: null });
  }


  /**
   * Helper function used to shuffle sneakers
   * @param {any} sneakers - array of objects
   * @returns a shuffled array of sneakers
   * @memberof App
   */
  shuffle(sneakers) {
    let length = sneakers.length;
    let last;
    let random;

    while (length) {
      random = Math.floor(Math.random() * (length -= 1));
      last = sneakers[length];
      sneakers[length] = sneakers[random];
      sneakers[random] = last;
    }
    return sneakers;
  }

  /**
   * When an action is taken on a users collection, we update their collection with new data
   * @param {any} data - object received from axios database request, containing an array of objects
   * @memberof App
   */
  newCollectionData(data){
    return this.setState({ collection: this.shuffle(data) });
  }

  /**
   * Pass props down to collection component
   * @memberof App
   */
  collectionComponent(){
    const { token, user, collection, message } = this.state;
    return (
      <Collection
        token={token}
        user={user}
        fetchMyCollection={this.fetchMyCollection}
        collection={collection}
        updateAnItem={this.updateAnItem}
        handleDelete={this.handleDelete}
        message={message}
        clearMessage={this.clearMessage}
        apiDataLoaded={this.state.apiDataLoaded}
      />
    );
  }

  /**
   * Pass props down to register component
   * @memberof App
   */
  newComponent(){
    return (
      <Register
        setUser={this.setUser}
      />
    );
  }

  /**
   * Pass props down to login component
   * @memberof App
   */
  loginComponent(){
    return (
      <Login
        setUser={this.setUser}
      />
    );
  }

  /**
   * Pass props down to add item component
   * @memberof App
   */
  addComponent(){
    const { token, user } = this.state;
    return (
    <AddItem
        token={token}
        user={user}
        newCollectionData={this.newCollectionData}
      />
    );
  }

  /**
   * Pass props down to update item component
   * @memberof App
   */
  updateComponent(){
    const { token, user, updatedItemInfo, itemToUpdate } = this.state;
    return (
    <UpdateItem
        token={token}
        user={user}
        itemToUpdate={itemToUpdate}
        updatedItemInfo={updatedItemInfo}
        newCollectionData={this.newCollectionData}
        shuffle={this.shuffle}
      />  
    );
  }

  /**
   * Checks if the user is logged in by checking the route path
   * @param {string} path - the route the user is trying to go to
   * @memberof App
   */
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

  /**
   * Error page
   * @param {any} {location} 
   * @memberof App
   */
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
              <Route exact path="/" component={Home} />
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