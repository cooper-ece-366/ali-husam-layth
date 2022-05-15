import React from "react";
import "../App/App.css";
import "./about.css";
import listCamel from "../img/list-camel.png";
import FadeIn from "react-fade-in/lib/FadeIn";

class About extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
        };
    }

    render() {
        return (
            <>
                <FadeIn delay="1000" transitionDuration="1000">
                <h1 className="about-header">About Us</h1>
                <div className="about-main-container">
                        <div className="about-mini-container">
                            <div className="about-image camel1"></div>
                            <p className="about-text">
                                Layth Yassin
                            </p>
                        </div>
                        <div className="about-mini-container">
                            <div className="about-image camel2"></div>
                            <p className="about-text ">Ali Ghuman</p>
                        </div>
                        <div className="about-mini-container">
                            <div className="about-image camel3"></div>
                            <p className="about-text">Husam Almanakly</p>
                        </div>
                </div>
				<div className="why-camel">
					<h1 className="why-camel-header">Why Camel?</h1>
					<p className="why-camel-text">We are Muslims interning in Seattle this summer and thought of this app idea. We would love an all in one place for food and Mosques and thought we would bring our idea to life with this app!</p>
				</div>
                <div className="fun-facts">
                    <h1>Camel Fun Facts!</h1>
                    <div className="fun-facts-image-container">
                        <ul className="fun-facts-list">
                            <li>
                                Camels have three sets of eyelids and two rows
                                of eyelashes to keep sand out of their eyes.
                            </li>
                            <li>
                                Camels have thick lips which let them forage for
                                thorny plants other animals can’t eat.
                            </li>
                            <li>
                                Thanks to thick pads of skin on their chest and
                                knees, camels can comfortably sit in very hot
                                sand.
                            </li>
                            <li>
                                When a camel finally does find water, he can
                                drink up to 40 gallons in one go.
                            </li>
                            <li>
                                There are over 160 words for camel in Arabic
                                alone.
                            </li>
                        </ul>
                        <img className="list-camel" src={listCamel} />
                    </div>
                </div>
                </FadeIn>
            </>
        );
    }
}

export default About;
