// Pop up code obtained at https://www.cluemediator.com/create-simple-popup-in-reactjs
//Husam found this component
import React from "react";
import "../pages/popup.css";

//Popup for displaying times
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        Operational Hours:
        <ul>
            {props.content.map((day) => (<li key={day}>{day}</li>))}
        </ul>
      </div>
    </div>
  );
};
 
export default Popup;