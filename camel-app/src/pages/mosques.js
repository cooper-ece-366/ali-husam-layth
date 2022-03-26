import React, {useState, useEffect} from "react";
import { EventEmitter } from "events";
import "../App/App.css"
import { BASE_URL } from '../constants';
import {fetchGoogle} from '../utils/apiCalls'

class Masjids extends React.Component {
    constructor() {
        super();
        this.state = {
          items: []
        };
    }
    
    componentDidMount() {
        let url = BASE_URL + "/api/mosques";
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
                Masjid Info!
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
                                <tr key={place.id}>
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
