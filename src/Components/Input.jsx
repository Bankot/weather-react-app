import React, { Component } from "react";
import arr from "../names.jsx";
import "./styles/input.css";
import Bdiv from "./Bdiv";
import { Link, withRouter } from "react-router-dom";
import video from "./movies/Main-movie.mp4";
import AnimateLoad from "./anim";
class Input extends Component {
  state = {
    baseArray: arr,
    collection: [],
    actual: ""
  };

  render() {
    let counter = 0;
    let collection = [];
    const handleKeyDown = () => {};
    const update = c => {
      document.getElementById("myInput").value = c;
    };
    const handleSubmit = e => {
      e.preventDefault();
      this.props.history.push("/" + result.trim());
    };
    const clearCollection = () => {
      this.setState({ collection: [] }, () => {});
    };
    const handleChange = e => {
      clearCollection();

      this.setState({ actual: e.target.value.trim() }, () => {
        const { actual } = this.state;
        if (!actual) {
          return false;
        }
        //closeAllLists();
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].substr(0, actual.length).toUpperCase() ===
            actual.toUpperCase()
          ) {
            counter++;
            collection.push(
              <Bdiv
                key={counter}
                ownId={counter}
                value={arr[i]}
                valid={actual}
                continue={arr[i].substr(actual.length)}
                clear={clearCollection}
                className="input-suggestion"
                update={c => {
                  update(c);
                }}
              />
            );
          }
        }

        this.setState({ collection: collection });
      });
    };
    let result = document.getElementById("myInput")
      ? document.getElementById("myInput").value
      : "default";
    let collectionDiv =
      this.state.collection.length > 13 ? (
        <div className="collection">{this.state.collection}</div>
      ) : (
        <div className="collection-noscroll">{this.state.collection}</div>
      );

    return (
      <div className="main-wrapper">
        <video preload="auto" className="weather-vid" loop autoplay="" muted>
          <source type="video/mp4" src={video} loop={true} muted />
        </video>

        <div className="input-container">
          <h1>Choose Your City!</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              id="myInput"
              type="text"
              onChange={e => {
                handleChange(e);
              }}
            />
            <button>
              <a>></a>
            </button>
          </form>
          {collectionDiv}
        </div>
      </div>
    );
  }
}
let Animated = AnimateLoad(Input);
export default withRouter(Animated);
