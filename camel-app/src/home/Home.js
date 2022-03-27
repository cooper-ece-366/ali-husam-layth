import React, { Component } from 'react';
import '../constants/index.js';
import './Home.css';
import logo from '../logo.jpeg';
import {THE_APP_NAME} from "../constants";

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="container">
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <a
                            className="App-link"
                            href="https://en.wikipedia.org/wiki/Bactrian_camel"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Mascot
                            </a>
                        </header>
                    </div>
                    <h1 className="home-title">{THE_APP_NAME} Demo</h1>
                </div>
            </div>
        )
    }
}

export default Home;