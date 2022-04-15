import React, {useState, useEffect} from "react";
import { EventEmitter } from "events";
import "../App/App.css"
import { BASE_URL } from '../constants';
import {fetchGoogle} from '../utils/apiCalls'

class Masjids extends React.Component {
    constructor() {
        super();
        this.state = {
          items: [], 
          city: ""
        };
        this.newCity = this.newCity.bind(this);
        this.getCoords = this.getCoords.bind(this);
    }
    
    url = BASE_URL + "/api/mosques"

    newCity(event){
        this.setState({city: event.target.value});
        // console.log(this.state.city)
    }

    getCoords() {
        this.props.getCoords(this.state.city).then( param => {
          let lat = param.results[0].geometry.location.lat();
          let lng = param.results[0].geometry.location.lng();
          // console.log(this.url + "?lat=" + lat + "&lng=" + lng)
          fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then(response => {
            this.setState({
              items: response
            })
          });
        })
      }


    componentDidMount() {;
        var lat = this.props.coords[0]
        var lng = this.props.coords[1]
        fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then(response => {
          this.setState({
              items: response
          })
        });

      }


    render(){
        var city = "";
        if (this.state.city){
          city = this.state.city
        }
        return (
            <div className="App-header">
            <h1>
                Masjid Info!
            </h1>
            <h3> Showing Results Nearby {city}</h3>
            <form>
                <input placeholder="Enter a City or ZIP" onChange={this.newCity} value={this.state.city}></input>
                <button onClick={this.getCoords}>
                Submit
                </button>
            </form>
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

export default Masjids;
