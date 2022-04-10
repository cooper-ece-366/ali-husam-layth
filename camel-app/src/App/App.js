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
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
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

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      lat: "",
      lng: ""
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

  success(pos) {
      var crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

  }

  
  componentDidMount = () => {
    window.onload = function() {
      if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
      }
    }
    this.loadCurrentlyLoggedInUser();
    //Add page to reload once login is complete

  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    this.setState({
      lat: latitude,
      lng: longitude
    });
  };

    //Geolocation services
      if (navigator.geolocation) {
         navigator.permissions
         .query({ name: "geolocation" })
         .then(function (result) {
             if (result.state === "granted") {
                console.log(result.state);
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success);

             } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);
             } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
             }
             result.onchange = function () {
                console.log(result.state);
         };
      });
      } else {
        alert("Sorry Not available!");
      }
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
            <Route path='/restaurants' component={() => <Restaurants lat={this.state.lat} lng={this.state.lng} />}  />
            <Route path='/mosques' component={() => <Masjids lat={this.state.lat} lng={this.state.lng} />} />
            <Route path='/prayerinfo' component={Salah} />
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} 
              component={Profile}></PrivateRoute>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} {...this.props}></Route>  
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
