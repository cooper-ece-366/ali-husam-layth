import React, { Component } from "react";
import "../constants/index.js";
import "./Home.css";
import logo from "../logo.png";
import { THE_APP_NAME } from "../constants";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="camel-container">
                    <FadeIn transitionDuration="2000" delay="1000">
                        <h1 className="camel-main"> Camel </h1>
                        <div className="App">
                            <p className="desc fade-in" >Camel is your one stop application for islamic purposes</p>
                            <p className="desc fade-in">Find halal food/masjids nearby, at a specified location, and even salah and qiblah information!</p>
                            <img 
                                src={logo} 
                                className="App-logo" 
                                alt="logo" 
                                width="10"
                            /> 
                            <header className="App-header">
                            <Link to="/about" className="about-link">
                                About
                            </Link>
                            </header>
                        </div>

                    </FadeIn>
                </div>
            </div>
        );
    }
}

export default Home;
