//Ali and Husam worked on this 
import "../App/App.css";
import "./items.css";
import { BASE_URL } from "../constants";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Template from "./template";
import Display from "../Components/dispResults";
import FadeIn from "react-fade-in/lib/FadeIn";

//This page renders the mosques page. This page is for users to find mosques nearby 
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
      <FadeIn transitionDelay="1000" delay="500">
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
      </FadeIn>
    );
  }
}

export default Masjids;
