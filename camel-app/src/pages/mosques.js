import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/apiCalls";
import "../App/App.css";
import "./items.css";
import Item from "../Components/items.js";
import { BASE_URL } from "../constants";
import { fetchGoogle } from "../utils/apiCalls";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Alert from "react-s-alert";

class Masjids extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      city: "",
      done: false,
    };
    this.newCity = this.newCity.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  url = BASE_URL + "/api/mosques";

  newCity(event) {
    this.setState({ city: event.target.value });
    // console.log(this.state.city)
  }

  getCoords() {
    if(this.state.city === ""){
      Alert.error("Invalid Area...");
      return
    }
    this.setState({ items: [] });
    this.props
      .getCoords(this.state.city)
      .then((param) => {
        let lat = param.results[0].geometry.location.lat();
        let lng = param.results[0].geometry.location.lng();
        // console.log(this.url + "?lat=" + lat + "&lng=" + lng)
        fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then(
          (response) => {
            response.results
              .filter((place) => place.photos === undefined)
              .forEach((place) => (place.photos = [1]));
            this.setState({
              items: response,
              done: true,
            });
          }
        );
      })
      .catch((err) => this.componentDidMount());
    console.log(this.state);
  }

  componentDidMount() {
    // console.log(this.props.coords)
    var lat = this.props.coords[0];
    var lng = this.props.coords[1];
    // console.log(this.url + "?lat=" + lat + "&lng=" + lng)
    fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then((response) => {
      response.results
        .filter((place) => place.photos === undefined)
        .forEach((place) => (place.photos = [1]));
      this.setState({
        items: response,
      });
    });
  }

  nextPage(){
    console.log(this.state.items)
    if(this.state.items.status === "INVALID_REQUEST"){
      Alert.error("Error");
      return
    }
    if(this.state.items.next_page_token === undefined){
      Alert.error("No results");
      return
    }
    this.setState({ items: [] });
    fetchGoogle(this.url + "?lat=1" + "&lng=1" + "&nextPage=" + this.state.items.next_page_token).then((response) => {
    response.results
      .filter((place) => place.photos === undefined)
      .forEach((place) => (place.photos = [1]));
    console.log(response.results);
    this.setState({
      items: response,
      });
    });
  }

  render() {
    var city = "";
    if (this.state.city) {
      city = this.state.city;
    }
    return (
      <div className="App-header">
        <h1 className="locations-header-h1">Mosques</h1>
        {city ? (
          <h3 className="locations-header-h3"> Showing Results Near {city}</h3>
        ) : (
          <h3 className="locations-header-h3"> Showing Results Nearby</h3>
        )}
        <form onSubmit={onSubmit} className="search-box">
          <button className="btn-search" onClick={this.getCoords}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
            onChange={this.newCity}
            value={this.state.city}
          ></input>
        </form>
        <div className="button-container">
          <button className="next-button" onClick={()=>{window.location.reload();}}>Reset</button>
          <button className="next-button" onClick={this.nextPage}>See Next...</button>
        </div>

        {(!this.state.items.length && Array.isArray(this.state.items)) ||
        this.state.items.status === "INVALID_REQUEST" ? (
          <ReactLoading
            className="loading"
            type={"spin"}
            color={"#92400e"}
            height={100}
            width={100}
          />
        ) : (
          <ul className="item-container">
            {this.state.items.results &&
              this.state.items.results.map((place) => (
                <Item
                  key={place.place_id}
                  place_name={place.name}
                  photo_reference={place.photos[0].photo_reference}
                  vicinity={place.vicinity}
                  rating={place.rating}
                />
              ))}
          </ul>
        )}
        <Alert stack={{limit: 3}} 
              timeout = {3000}
              position='top-right' effect='slide' offset={65} /> 
      </div>
    );
  }
}

export default Masjids;
