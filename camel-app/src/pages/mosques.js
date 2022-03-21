import React, {useState, useEffect} from "react";
import { EventEmitter } from "events";
import "../App.css"

const Masjids = () => {
    const [items, setState] = useState([])
    const fetchData = () => {
        var url = "http://localhost:8080/api/mosques";
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

export default Masjids;
