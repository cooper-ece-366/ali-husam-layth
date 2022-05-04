import "../App/App.css";
import "./items.css";
import { BASE_URL } from "../constants";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Template from "./template";
import Display from "../Components/dispResults";

class Masjids extends Template {
  constructor() {
    super();
  }

  url = BASE_URL + "/api/mosques";

  
  render() {
    var city = "";
    if (this.state.city) {
      city = this.state.city;
    }
    return (
      <div className="App-header">
        <h1 className="locations-header-h1">Mosques</h1>
        {city ? (
          <h3 className="locations-header-h3"> Showing Results Near {city}</h3>
        ) : (
          <h3 className="locations-header-h3"> Showing Results Nearby</h3>
        )}
        <Display
          getCoords={this.getCoords}
          newCity={this.newCity}
          city={this.state.city}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          items={this.state.items}  
        />
      </div>
    );
  }
}

export default Masjids;
