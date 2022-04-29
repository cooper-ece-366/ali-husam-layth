// Author: Layth Yassin
import React from "react";
import "../App/App.css"
import { BASE_URL } from '../constants';
import {fetchGoogle} from '../utils/apiCalls';
import ReactLoading from "react-loading";
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';

class Salah extends React.Component {
  constructor() {
     super();
     this.state = {
       items: []
     };
     this.timeSlice = this.timeSlice.bind(this);
  }
  timeSlice(response) {
    for (var athan of Object.keys(response.results)) {
        var fields = response.results[athan].split('%');
        response.results[athan] = fields[0] + ' ' + fields[1];
    }
  }
  componentDidMount() {
      let url = BASE_URL + "/api/prayerinfo";
      fetchGoogle(url).then(response => {
        this.timeSlice(response);
        this.setState({
            items: response
        })
      });
  }

  render(){
    let myData = this.state.items.results || {};
    var lat = this.props.coords[0];
    var lng = this.props.coords[1];
    const kaabaN = 21.4224779;
    const kaabaE = 39.8251832;
    const direction = 58.50816668110658; // TODO: use api to get this instead
    const pathCoordinates = [
        {lat: lat, lng: lng},
        {lat: kaabaN, lng: kaabaE}
    ];
    return (
    <React.Fragment>
        <div>
        <h1>
          Salah and Prayer Information
        </h1>
        {(!this.state.items.length && Array.isArray(this.state.items)) || this.state.items.status === "INVALID_REQUEST" ? (
          <ReactLoading
            className="loading"
            type={"spin"}
            color={"#92400e"}
            height={100}
            width={100}
          />
            ) : (
            <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Salah</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fajr</td>
                <td>{myData.Fajr}</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{myData.Duha}</td>
              </tr>
              <tr>
                <td>Dhuhr</td>
                <td>{myData.Dhuhr}</td>
              </tr>
              <tr>
                <td>Asr</td>
                <td>{myData.Asr}</td>
              </tr>
              <tr>
                <td>Maghrib</td>
                <td>{myData.Maghrib}</td>
              </tr>
              <tr>
                <td>Isha</td>
                <td>{myData.Isha}</td>
              </tr>
            </tbody>
        </table>
        )}
        </div>
        <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: lat, lng: lng }}
        >
          <Marker position={{lat: lat, lng: lng}} />
          <Marker position={{lat: kaabaN, lng: kaabaE}} />
        <Polyline
        path={pathCoordinates}
        options={{
          geodesic: true,
          strokeColor: '#669DF6',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}/>
        </Map>
        </div>
        </React.Fragment>
    );
  }
};

const mapStyles = {
  width: '100%',
  height: '50%',
};

export default GoogleApiWrapper({
  apiKey: 'API KEY'
})(Salah);

