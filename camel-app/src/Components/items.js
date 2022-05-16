//Ali and Husam worked on this component
import React, {useState} from "react";
import { saveItem } from "../utils/apiCalls";
import { BASE_URL } from "../constants";
import Popup from "./popup";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";


//Component used to create each individial item in the mosques and restaurants page
const Item = (props) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  //Husam: set an item as favorited
  const favorite = () => {
    let url = BASE_URL + "/api/saveFav"
    
    let values = {
      "photo": props.photo_reference,
      "website": props.website,
      "vicinity": props.vicinity, 
      "name": props.place_name, 
      "rating": props.rating
    }

    saveItem(url, values)

    Alert.success("Place Saved!")
    
    return
  }

  return (
    <>
      <li key={props.itemkey}>
        <div className="item-flex-container">
          <div>
            <a href={props.website}>
              <img
                className="imgfit picture"
                src={
                  process.env.REACT_APP_PHOTOS +
                  process.env.REACT_APP_API +
                  "&photoreference=" +
                  props.photo_reference
                }
                alt=""
                />
            </a>
          </div>
          <div className="item-flex-info">
            <div className="name-rating-container">
              <div className="item-flex-items name">{props.place_name}</div>
              <div className="item-flex-items rating">{props.rating}</div>
            </div>
            <div className="item-flex-items vicinity">{props.vicinity}</div>
            <div className="button-flex-container">
              {props.hours.open_now && <div className="item-flex-items vicinity button-flex open-now">Open Now</div>}
              {!props.hours.open_now && !props.hours.Undefined && <div className="item-flex-items vicinity button-flex closed-now">Closed</div>}
              {!props.hours.Undefined && <input
                className="next-button"
                type="button"
                value="Click to see hours"
                onClick={togglePopup}
              />}
              {isOpen && <Popup
                  content={props.hours.weekday_text}
                  handleClose={togglePopup}
                />}
              <input
                className="next-button"
                type="button"
                value="Save"
                onClick={favorite}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

// onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'"
export default Item;
