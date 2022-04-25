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
  }

  url = BASE_URL + "/api/mosques";

  newCity(event) {
    this.setState({ city: event.target.value });
    // console.log(this.state.city)
  }

  getCoords() {
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
      </div>
    );
  }
}

export default Masjids;
