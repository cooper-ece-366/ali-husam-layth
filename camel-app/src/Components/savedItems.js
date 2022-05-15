import React, {useState} from "react";
import { delFav } from "../utils/apiCalls";
import { BASE_URL } from "../constants";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";


class SavedItem extends React.Component{
    constructor() {
        super();
        this.deleteItem.bind(this);
    }
    deleteItem = () => {
        let url = BASE_URL + "/api/removeFav"
        delFav(url, this.props.id)
        // window.location.reload()
        Alert.success("Removed favorited item")
        this.props.callback(this.props.id)
        return
    }
    
    render(){
        return (
        <>
          <li key={this.props.itemkey}>
            <div className="item-flex-container">
              <div>
                <a href={this.props.website}>
                  <img
                    className="imgfit picture"
                    src={
                      process.env.REACT_APP_PHOTOS +
                      process.env.REACT_APP_API +
                      "&photoreference=" +
                      this.props.photo
                    }
                    alt=""
                    />
                </a>
              </div>
              <div className="item-flex-info">
                <div className="name-rating-container">
                  <div className="item-flex-items name">{this.props.name}</div>
                  <div className="item-flex-items rating">{this.props.rating}</div>
                </div>
                <div className="item-flex-items vicinity">{this.props.vicinity}</div>
                <div className="button-flex-container">
                  <input
                    className="next-button"
                    type="button"
                    value="Delete Item"
                    onClick={this.deleteItem}
                  />
                </div>
              </div>
            </div>
          </li>
        </>
      );
    };
}

// onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'"
export default SavedItem;
