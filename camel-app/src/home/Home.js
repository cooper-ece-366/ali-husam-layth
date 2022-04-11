import React, { Component } from "react";
import "../constants/index.js";
import "./Home.css";
import logo from "../logo.png";
import { THE_APP_NAME } from "../constants";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="camel-container">
                    <h1 className="camel-main"> Camel </h1>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        <Link to="/about" className="about-link">
                            About
                        </Link>
                        </header>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
