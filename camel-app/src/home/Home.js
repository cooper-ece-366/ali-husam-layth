//Ali and Husam worked on this 
import React, { Component } from "react";
import "../constants/index.js";
import "./Home.css";
import logo from "../logo.png";
import { THE_APP_NAME } from "../constants";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

//Used to render the home page 
class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="camel-container">
                    <FadeIn transitionDuration="2000" delay="1000">
                        <h1 className="camel-main"> Camel </h1>
                        <div className="App">
                            <p className="desc" >Camel is your one stop application for islamic purposes - login or create an account to use now </p>
                            <p className="desc">Find halal food and masjids, salah and qiblah information, and save your favorite spots!</p>
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
