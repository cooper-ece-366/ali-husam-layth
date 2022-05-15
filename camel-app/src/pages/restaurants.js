import React, { useState, useEffect } from "react";
import "../App/App.css";
import "./items.css";
import { BASE_URL } from "../constants";
import Template from "./template";
import Display from "../Components/dispResults";
import FadeIn from "react-fade-in/lib/FadeIn";

class Restaurants extends Template {
  constructor() {
    super();
  }
  url = BASE_URL + "/api/restaurants";

  render() {
    var city = "";
    if (this.state.city) {
      city = this.state.city;
    }
    console.log(this.state.items)
    
    // console.log(this.state.items);
    return (
      <FadeIn transitionDelay="1000" delay="500">
        <div className="App-header">
        <h1 className="locations-header-h1">Restaurants</h1>
          {(city ? (<h3 className="locations-header-h3"> Showing Results Near {city}</h3>) : (<h3 className="locations-header-h3"> Showing Results Nearby</h3>))}
          <Display
            getCoords={this.getCoords}
            newCity={this.newCity}
            city={this.state.city}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
            items={this.state.items} 
          />
        </div>
      </FadeIn>
    );
  }
}

export default Restaurants;
