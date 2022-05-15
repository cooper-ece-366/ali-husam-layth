import React, {useState} from "react";
import Popup from "./popup";


const Item = (props) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
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
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

// onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'"
export default Item;
