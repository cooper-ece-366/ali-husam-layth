import React from "react";
import { onSubmit } from "../utils/apiCalls";
import ReactLoading from "react-loading";
import Item from "../Components/items.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrinTongueSquint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import "../pages/items.css";

const Display = (props) => {
  return (
    <>
      <div className="button-container">
        <button className="next-button" onClick={props.prevPage}>
          Previous
        </button>
        <form onSubmit={onSubmit} className="search-box">
          <button className="btn-search" onClick={props.getCoords}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
            onChange={props.newCity}
            value={props.city}
          ></input>
        </form>
        <button className="next-button" onClick={props.nextPage}>
          Next
        </button>
      </div>

      {(!props.items.length && Array.isArray(props.items)) ||
      props.items.status === "INVALID_REQUEST" ? (
        <ReactLoading
          className="loading"
          type={"spin"}
          color={"#92400e"}
          height={100}
          width={100}
        />
      ) : (
        <div>
          <ul className="item-container">
            {props.items.results &&
              props.items.results.map((place) => (
                <Item
                  key={place.place_id}
                  place_name={place.name}
                  photo_reference={place.photos[0].photo_reference}
                  vicinity={place.vicinity}
                  rating={place.rating}
                  website={place.website}
                  hours={place.hours}
                />
              ))}
          </ul>
          <div class="reset-div">
            <button
              className="next-button reset"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
          <Alert
            stack={{ limit: 3 }}
            timeout={3000}
            position="top-right"
            effect="slide"
            offset={65}
          />
        </div>
      )}
    </>
  );
};

export default Display;
