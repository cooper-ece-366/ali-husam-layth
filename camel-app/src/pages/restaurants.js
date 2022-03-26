import React, {useState, useEffect} from "react";
import { EventEmitter } from "events";
import "../App/App.css"
import { BASE_URL } from '../constants';
import {fetchGoogle} from '../utils/apiCalls';

class Restaurants extends React.Component {
    constructor() {
        super();
        this.state = {
          items: []
        };
    }
  componentDidMount() {
      let url = BASE_URL + "/api/restaurants";
      fetchGoogle(url).then(response => {
        this.setState({
            items: response
        })
      });
    }
  render(){
      return (
        <div className="App-header">
          <h1>
            Restaurants In Your Area
          </h1>
          <table className="table table-striped table-bordered">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Rating</th>
                  </tr>
              </thead>
              <tbody>
                  {this.state.items.results && this.state.items.results.map(place =>
                      <tr key={place.place_id}>
                          <td>{place.name}</td>
                          <td>{place.vicinity}</td>
                          <td>{place.rating}</td>
                      </tr>
                  )}
              </tbody>
          </table>
        </div>
      );
    };
  }

export default Restaurants;
