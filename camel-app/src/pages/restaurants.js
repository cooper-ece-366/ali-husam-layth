import React, { useState, useEffect } from "react";
import "../App/App.css";
import "./items.css";
import { BASE_URL } from "../constants";
import Template from "./template";
import Display from "../Components/dispResults";

class Restaurants extends Template {
  constructor() {
    super();
  }
  url = BASE_URL + "/api/restaurants";

  //TODO: Get place url by making google place api call (additional to nearby search, consider modifying server and client calls)
  render() {
    var city = "";
    if (this.state.city) {
      city = this.state.city;
    }
    console.log(this.state.items)
    
    // console.log(this.state.items);
    return (
      <div className="App-header">
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
    );
  }
}

export default Restaurants;
