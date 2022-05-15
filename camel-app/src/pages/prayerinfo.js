// Author: Layth Yassin
import React from "react";
import "../App/App.css";
import "./prayerinfo.css";
import { BASE_URL } from "../constants";
import { fetchGoogle } from "../utils/apiCalls";
import ReactLoading from "react-loading";
import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import FadeIn from "react-fade-in/lib/FadeIn";

class Salah extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.timeSlice = this.timeSlice.bind(this);
  }
  
  // slice string containing athan times, and assign the time to corresponding prayer with prayer name being the key
  // and prayer time being the value
  timeSlice(response) {
    for (var athan of Object.keys(response.results)) {
      var fields = response.results[athan].split("%");
      response.results[athan] = fields[0] + " " + fields[1];
    }
  }
  // make api call to obtain prayer times, send user lat lng coordinates to backend
  componentDidMount() {
      let url = BASE_URL + "/api/prayerinfo";
      var lat = this.props.coords[0]
      var lng = this.props.coords[1]
      fetchGoogle(url + "?lat=" + lat + "&lng=" + lng).then(response => {
        this.timeSlice(response);
        this.setState({
            items: response
        })
      });
    });
  }

  render() {
    // set up coordinate paths for drawing the qibla line from user location to the Kaaba
    let myData = this.state.items.results || {};
    var lat = this.props.coords[0];
    var lng = this.props.coords[1];
    const kaabaN = 21.4224779;
    const kaabaE = 39.8251832;
    const pathCoordinates = [
      { lat: lat, lng: lng },
      { lat: kaabaN, lng: kaabaE },
    ];
    const mapStyles = {
        width: '50%',
        height: '50%'
    };

    return (
      <React.Fragment>
        <FadeIn transitionDelay="2000" delay="500">
          <div className="prayer-container">
            <h1 className="locations-header-h1">Salah and Prayer Information</h1>
            {/* while fetching prayer times through api call, display a loading icon */}
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
            <table className="table table-striped table-bordered">
            {/* display the prayer times in a table */}
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
        {/* display map component to show prayer direction */}
        <Map
          google={this.props.google}
          zoom={20}
          style={mapStyles}
          initialCenter={{ lat: lat, lng: lng }}
        >
        {/* draw the line representing the prayer direction on the map */}
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
        </FadeIn>
        </React.Fragment>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API
})(Salah);
