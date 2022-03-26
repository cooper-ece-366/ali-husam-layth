import React, { Component } from 'react';
// import Navbar from '../Components';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Masjids from '../pages/mosques';
import Salah from '../pages/prayerinfo';
import Restaurants from '../pages/restaurants';
import Home from '../home/Home';
import { getCurrentUser } from '../utils/apiCalls';
import {ACCESS_TOKEN} from '../constants';
import Login from '../user/login/login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import Alert from 'react-s-alert';
import AppHeader from '../common/AppHeader';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator'
import OAuth2RedirectHandler from '../user/oath/OAuth2RedirectHandler';
import './App.css';

function message(){

    const apiUrlPrefix = "http://localhost:8080";

    const testUrl = apiUrlPrefix.concat("/api/message")
    fetch(testUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log("Cannot connect to API endpoint: %s", testUrl);
      });
}
message();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false,
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }


  render()
  {
    if(this.state.loading) {
      return <LoadingIndicator />
    }
    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path='/restaurants' component={Restaurants} />
            <Route path='/mosques' component={Masjids} />
            <Route path='/prayerinfo' component={Salah} />
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
