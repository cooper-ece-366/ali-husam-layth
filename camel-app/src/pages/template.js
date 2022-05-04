import React, { useState, useEffect } from "react";
import "../App/App.css";
import "./items.css";
import { fetchGoogle } from "../utils/apiCalls";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Alert from "react-s-alert";
import { BASE_URL } from "../constants";

const google = window.google;

//Template class for Restaurants and Mosques page - Shares all the same information
class Template extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      stack: [], 
      city: "",
      page: 0,
      resp: ""
    };
    this.newCity = this.newCity.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  getCoords() {
    if(this.state.city === ""){
      Alert.error("Invalid Area...");
      return
    }
    this.setState({ items: [] });
    this.props.getCoords(this.state.city).then((param) => {
      let lat = param.results[0].geometry.location.lat();
      let lng = param.results[0].geometry.location.lng();
      // console.log(this.url + "?lat=" + lat + "&lng=" + lng)
      fetchGoogle(this.url + "?lat=" + lat + "&lng=" + lng).then((response) => {
        response.results
          .filter((place) => place.photos === undefined)
          .forEach((place) => (place.photos = [1]));
        this.setState({
          items: response,
          stack: response
        });
      });
    });
  }

  nextPage(){
    // console.log(this.state.items.next_page_token)
    console.log(this.state.stack, this.state.page+1)
    if(this.state.items.status === "INVALID_REQUEST"){
      Alert.error("Error");
      return
    }
    if(this.state.items.next_page_token === undefined){
      Alert.error("No more results");
      return
    }
    // var lat = this.props.coords[0];
    // var lng = this.props.coords[1];
    // this.setState({stack: this.state.stack.push(this.state.items)})
    this.setState({ items: [] });
    let len = this.state.stack.length
    let p = this.state.page+1
    console.log(len == 1 || (len == 2 && p == 2))
    if (len == 1 || (len == 2 && p == 2)){
    // if(true){
        fetchGoogle(this.url + "?lat=" + 1 + "&lng=" + 1 + "&nextPage=" + this.state.resp).then((response) => {
        response.results
          .filter((place) => place.photos === undefined)
          .forEach((place) => (place.photos = [1]));
        console.log(response);
        this.setState({
            stack: [...this.state.stack, response],
            items: response,
            page: p,
            resp: response.next_page_token
            // items: this.state.stack[p]
        });
    });
    }
    else{
        let currItems = this.state.stack[p]
        this.setState({
            page: p, 
            items: currItems
        })
    }
  }

  prevPage(){
    let p = this.state.page
    console.log(this.state.stack, p)
    if(this.state.stack == []){
        return 
    }
    if(this.state.stack.length == 0 || p <= 0){
      Alert.error("Error");
      return
    }
    let currItems = this.state.stack[p-1]

    this.setState({
        items: currItems, 
        page: p-1
    });
    console.log("UPDATED", this.state.stack)
  }


  newCity(event) {
    this.setState({ city: event.target.value });
    // console.log(this.state.city)
  }

  getLinks(place){
    let url = BASE_URL + "/api/links" + "?placeId=" + place.place_id
    return fetchGoogle(url)
    .then((response) => {
        // console.log(response.result.website)
        return response.result.website
    })
  }
  
  componentDidMount() {
    var lat = this.props.coords[0];
    var lng = this.props.coords[1];
    let url = ""
    url = this.url + "?lat=" + lat + "&lng=" + lng;
    fetchGoogle(url).then((response) => {
      response.results
        .filter((place) => place.photos === undefined)
        .forEach((place) => (place.photos = [1]));
      response.results.forEach((place) => {this.getLinks(place)})
      this.setState({
        items: response,
        stack: [response],
        resp: response.next_page_token
      });
    //   response.results.map(place => ({...place, website: this.getLinks(place).then(resp => console.log(resp))}))
    });
    
  }

  //TODO: Get place url by making google place api call (additional to nearby search, consider modifying server and client calls)
  render() {
    return false;
    }
}

export default Template;
