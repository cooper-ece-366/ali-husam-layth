import React from "react";

const Item = (props) => {
  return (
    <>
      <li key={props.key}>
        <div className="item-flex-container">
          <div>
            <a href="#">
              <img
                className="imgfit picture"
                src={
                  process.env.REACT_APP_PHOTOS +
                  process.env.REACT_APP_API +
                  "&photoreference=" +
                  props.photo_reference
                }
                alt="Image"
              />
            </a>
          </div>
          <div className="item-flex-info">
            <div className="name-rating-container">
              <div className="item-flex-items name">{props.place_name}</div>
              <div className="item-flex-items rating">{props.rating}</div>
            </div>
            <div className="item-flex-items vicinity">{props.vicinity}</div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Item;
