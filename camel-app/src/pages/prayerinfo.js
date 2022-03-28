import React, {useState, useEffect} from "react";
import { EventEmitter } from "events";
import "../App.css"


const Salah = () => {
    const [items, setState] = useState([])
    const fetchData = () => {
        var url = "http://localhost:8080/api/prayerinfo";
        fetch(url)
              .then(response => response.json())
              .then(data => {
                setState(data);
//                console.log(data);
        }).catch(err => {
            console.log("Cannot connect to API endpoint: %s", url);
        });
    };
    useEffect(() => {
        fetchData();
      }, [])
//    console.log(items.results)
//    var items = [{"name": "test1", "rating": 4.5, "vicinity": "103 Cock Lane" }, {"name": "test2", "rating": 2.5, "vicinity": "200 layth butt" }, {"name": "test3", "rating": 3.2, "vicinity": "100 Ari Butt" }];
  return (
    <div className="App-header">
      <h1>
        Salah and Prayer Information
      </h1>
      <table className="table table-striped table-bordered">
          <tr>
              <th>Salah</th>
              <th>Time</th>
          </tr>
          <tr>
            <td>Fajr</td>
            <td>{items.fajr}</td>
          </tr>
          <tr>
            <td>Sunrise</td>
            <td>{items.sunrise}</td>
          </tr>
          <tr>
            <td>Dhuhr</td>
            <td>{items.dhuhr}</td>
          </tr>
          <tr>
            <td>Asr</td>
            <td>{items.asr}</td>
          </tr>
          <tr>
            <td>Maghrib</td>
            <td>{items.maghrib}</td>
          </tr>
          <tr>
            <td>Isha</td>
            <td>{items.isha}</td>
          </tr>
      </table>
    </div>
  );
};

export default Salah;
