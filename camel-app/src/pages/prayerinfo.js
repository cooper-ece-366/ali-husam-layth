import React from "react";
import "../App/App.css"
import { BASE_URL } from '../constants';
import {fetchGoogle} from '../utils/apiCalls';

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
    return (
      <div className="App-header">
        <h1>
          Salah and Prayer Information
        </h1>
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
      </div>
    );
  }
};

export default Salah;