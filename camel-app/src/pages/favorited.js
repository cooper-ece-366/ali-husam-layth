//Ali and Husam worked on this 
import React, { useState, useEffect } from "react";
import "../App/App.css";
import "./items.css";
import { BASE_URL } from "../constants";
import { getFavorites } from "../utils/apiCalls";
import Display from "../Components/dispResults";
import SavedItem from "../Components/savedItems";
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in/lib/FadeIn";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

//This renders the favorites page. This page is used to display everything the user has favorited
//may it be restaurants or mosques
class Favorited extends React.Component {
  constructor() {
    super();
    this.state = {
        items: []
      };
  }

  //function to delete item from favorites page
  delItem = (removeID) => {
      let tmp = this.state.items.filter((place) => place.id !== removeID)  
      this.setState({
          items: tmp
      })
    
    }

  componentDidMount(){
    let url = BASE_URL + "/api/getFav";
    getFavorites(url).then((response) => {
    //   console.log(response);
      this.setState({
        items: response,
      });
    });
  }

  render() {
    return (
      <FadeIn transitionDelay="1000" delay="1000">
        <div className="App-header">
        <h1 className="locations-header-h1">Saved Places</h1>
        </div>
          <div>
            <ul className="item-container">
              {this.state.items &&
                this.state.items.map((place) => (
                  <SavedItem
                    key={place.place_id}
                    name={place.name}
                    photo={place.photo}
                    vicinity={place.vicinity}
                    rating={place.rating}
                    website={place.website}
                    id={place.id}
                    callback={this.delItem}
                  />
                  ))}
            </ul>
            <Alert stack={{limit: 3}} 
              timeout = {3000}
              position='top-right' effect='slide' offset={65} /> 
          </div>

      </FadeIn>
    );
  }
}

export default Favorited;
