// Author: Layth Yassin and Ali Ghuman
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

//This page is used to render the prayers page which is used to get the prayer times by location.
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
  }

  render(){
    let myData = this.state.items.results || {};
    var lat = this.props.coords[0];
    var lng = this.props.coords[1];
    const kaabaN = 21.4224779;
    const kaabaE = 39.8251832;
    const direction = 58.50816668110658; // TODO: use api to get this instead
    const pathCoordinates = [
      { lat: lat, lng: lng },
      { lat: kaabaN, lng: kaabaE },
    ];
    return (
      <React.Fragment>
        <FadeIn transitionDelay="2000" delay="500">
          <div className="prayer-container">
            <h1 className="locations-header-h1">Salah and Prayer Information</h1>
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
                <div className="prayer-info">
                  <div className="sunrise">
                    <div className="prayer-name">Sunrise</div>
                    <FontAwesomeIcon className='sun-icon pulse' icon={faSun} />
                    <div className="time">{myData.Duha}</div>
                  </div>
                  <div className="prayer-item fajr">
                    <div className="prayer-name">Fajr</div>
                    <div className="time">{myData.Fajr}</div>
                  </div>
                  <div className="prayer-item dhuhr">
                    <div className="prayer-name">Dhuhr</div>
                    <div className="time">{myData.Dhuhr}</div>
                  </div>
                  <div className="prayer-item asr">
                    <div className="prayer-name">Asr</div>
                    <div className="time">{myData.Asr}</div>
                  </div>
                  <div className="prayer-item isha">
                    <div className="prayer-name">Maghrib</div>
                    <div className="time">{myData.Maghrib}</div>
                  </div>
                  <div className="prayer-item isha">
                    <div className="prayer-name">Isha</div>
                    <div className="time">{myData.Isha}</div>
                  </div>
                </div>
            )}
          <Map
            className="map"
            google={this.props.google}
            zoom={20}
            style={mapStyles}
            initialCenter={{ lat: lat, lng: lng }}
          >
            <Marker position={{ lat: lat, lng: lng }} />
            <Marker position={{ lat: kaabaN, lng: kaabaE }} />
            <Polyline
              path={pathCoordinates}
              options={{
                geodesic: true,
                strokeColor: "#669DF6",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          </Map>
          </div>
      </FadeIn>
      </React.Fragment>
    );
  }
}

const mapStyles = {
  width: "100%",
  height: "650px",
};


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API
})(Salah);
