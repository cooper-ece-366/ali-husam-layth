import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { THE_APP_NAME } from "../constants";
import { logout } from "../utils/apiCalls";
import "./AppHeader.css";
import icon from '../icon.jpeg';

class AppHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="home-header-container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">
                            <img className="icon" src={icon}></img> 
                        </Link>
                    </div>
                    <div className="public">
                        <nav className="app-nav">
                            <ul>
                                <li>
                                    <NavLink to="/restaurants">Halal Nearby </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/prayerinfo">Salah Times</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/mosques">Masjid Info</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                            {this.props.authenticated ? (
                                <ul>
                                    <li>
                                        {/* <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/> */}
                                        <NavLink to="/profile" className="profile">Profile</NavLink>
                                    </li>
                                    <li>
                                        <a onClick={this.props.onLogout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            ) : (
                                <ul>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">Signup</NavLink>
                                    </li>
                                </ul>
                            )}
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;
