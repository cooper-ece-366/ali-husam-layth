import React, {useState, useEffect} from "react";
import { EventEmitter } from "events";
import "../App.css"


const Restaurants = () => {
    const [items, setState] = useState([])
    const fetchData = () => {
        var url = "http://localhost:8080/api/restaurants";
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
              {items.results && items.results.map(place =>
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

export default Restaurants;
