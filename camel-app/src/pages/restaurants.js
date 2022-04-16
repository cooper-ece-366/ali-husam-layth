import React, {useState, useEffect} from "react";
import "../App/App.css"
import { BASE_URL } from '../constants';
import {fetchGoogle} from '../utils/apiCalls';
import { onSubmit } from "../utils/apiCalls";
import ReactLoading from "react-loading";

const google = window.google;

class Restaurants extends React.Component {
  constructor() {
      super();
      this.state = {
        items: [],
        city: "",
      };
      this.newCity = this.newCity.bind(this);
      this.getCoords = this.getCoords.bind(this);
  }
  url = BASE_URL + "/api/restaurants";
  
  getCoords() {
    this.setState({items: []});
    this.props.getCoords(this.state.city).then( param => {
      let lat = param.results[0].geometry.location.lat();
      let lng = param.results[0].geometry.location.lng();
      // console.log(this.url + "?lat=" + lat + "&lng=" + lng)
      fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then(response => {
        response.results.filter(place => place.photos === undefined).forEach(place => place.photos = [1])
        this.setState({
          items: response
        })
      });
    })
  }

  newCity(event){
    this.setState({city: event.target.value});
    // console.log(this.state.city)
  }

  componentDidMount() {
    var lat = this.props.coords[0]
    var lng = this.props.coords[1]
    fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then(response => {
      response.results.filter(place => place.photos === undefined).forEach(place => place.photos = [1])
      console.log(response.results)
      this.setState({
        items: response
      })
    });
    }
  
  //TODO: Get place url by making google place api call (additional to nearby search, consider modifying server and client calls)
  render(){
      var city = "";
      if (this.state.city){
        city = this.state.city
      }
      // console.log(this.state.items)
      // console.log(process.env.REACT_APP_PHOTOS + process.env.REACT_APP_API + "&photoreference=")
      return (
        <div className="App-header">
          <h1>
            Restaurants 
          </h1>
          <h3> Showing Results Nearby {city}</h3>
          <form onSubmit={onSubmit}>
            <input placeholder="Enter a City or ZIP" onChange={this.newCity} value={this.state.city}></input>
            <button onClick={this.getCoords}>
              Submit
            </button>
          </form>
          {(!this.state.items.length && Array.isArray(this.state.items)) || this.state.items.status === "INVALID_REQUEST" ? (
                <ReactLoading
                    className="loading"
                    type={"spin"}
                    color={"#92400e"}
                    height={100}
                    width={100}
                />
            ) : (
                <ol>
                  {this.state.items.results && this.state.items.results.map(place => 
                      <li key={place.place_id}>
                        <div className="flex-container">
                            <img 
                                className="flex-items" 
                                src={process.env.REACT_APP_PHOTOS + process.env.REACT_APP_API + "&photoreference=" + place.photos[0].photo_reference}
                                alt="Image"
                            />
                          <div className="flex-items">{place.name}</div>
                          <div className="flex-items">{place.vicinity}</div>       
                          <div className="flex-items">{place.rating + "/5"}</div>
                        </div>
                      </li>
                  )}
                </ol>
            )}
        </div>
      );
    };
  }

export default Restaurants;
