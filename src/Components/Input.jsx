import React, { Component } from "react";
import arr from "../names.jsx";
import "./styles/input.css";
import Bdiv from "./Bdiv";
import { Link, withRouter } from "react-router-dom";
import video from "./movies/Main-movie.mp4";
import AnimateLoad from "./anim";
import { isObject } from "util";
import { create } from "domain";
class Input extends Component {
  state = {
    baseArray: arr,
    suggestionCounter: 0,
    collection: [],
    actual: "",
    counter: 0
  };

  render() {
    const myRef = React.createRef();
    let counter = this.state.counter;
    let collection = [];
    const update = c => {
      document.getElementById("myInput").value = c;
      this.props.history.push("/" + c);
    };
    const handleSubmit = e => {
      e.preventDefault();
      if (document.getElementsByClassName("autocomplete-item-active").length) {
        this.props.history.push(
          "/" +
            document.getElementsByClassName("autocomplete-item-active")[0]
              .innerText
        );
      } else {
        this.props.history.push("/" + result.trim());
      }
    };
    const clearCollection = () => {
      this.setState({ collection: [] }, () => {});
    };
    const createCollection = e => {
      clearCollection();
      this.setState({ actual: e.value.trim() }, () => {
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
                classAdd={classAdd}
                classRemove={classRemove}
                key={counter}
                ownId={counter}
                value={arr[i]}
                valid={actual}
                continue={arr[i].substr(actual.length)}
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
    const handleChange = e => {
      createCollection(e);
    };
    const indexChecker = arr => {
      for (let x = 0; x < arr.length; x++) {
        if (arr[x].classList.contains("autocomplete-item-active")) {
          return x;
        }
      }
      return false;
    };
    let suggestionCounter = 0;

    const keyHandler = e => {
      //==================== if it exists =============================
      if (document.getElementById("collection").childNodes) {
        let arrayOfItems = document.getElementById("collection").childNodes;
        //================= if there is an active item =================
        if (
          //================ if there's active one =====================
          document.getElementsByClassName("autocomplete-item-active").length
        ) {
          //================= reset ==============================
          if (e === "ArrowDown") {
            if (
              suggestionCounter >=
              document.getElementById("collection").childNodes.length - 1
            ) {
              console.log("RESET");
              suggestionCounter = 0;
              classAdd(suggestionCounter);
            }
            suggestionCounter = indexChecker(arrayOfItems) + 1;
            classRemove();
            classAdd(suggestionCounter);
          }
          if (e === "ArrowUp" && suggestionCounter > 0) {
            suggestionCounter = indexChecker(arrayOfItems) - 1;
            classRemove();
            classAdd(suggestionCounter);
          }
        } else if (
          !document.getElementsByClassName("autocomplete-item-active").length
        ) {
          if (e === "ArrowDown") {
            suggestionCounter = 0;
            classAdd(suggestionCounter);
          }
        }
      }
    };
    let result = document.getElementById("myInput")
      ? document.getElementById("myInput").value
      : "default";
    let collectionDiv =
      this.state.collection.length > 13 ? (
        <div id="collection" className="collection">
          {this.state.collection}
        </div>
      ) : (
        <div id="collection" className="collection-noscroll">
          {this.state.collection}
        </div>
      );
    const classAdd = a => {
      if (document.getElementById("collection")) {
        document
          .getElementById("collection")
          .childNodes[a].classList.add("autocomplete-item-active");
      }
    };
    const classRemove = a => {
      if (document.getElementsByClassName("autocomplete-item-active").length) {
        let arr = document.getElementsByClassName("autocomplete-item-active");
        for (let x = 0; x < arr.length; x++) {
          arr[x].classList.remove("autocomplete-item-active");
        }
      }
    };
    console.log("render");
    return (
      <div className="main-wrapper">
        <video
          onClick={clearCollection}
          preload="auto"
          className="weather-vid"
          loop
          autoplay=""
          muted
        >
          <source type="video/mp4" src={video} loop={true} muted />
        </video>

        <div className="input-container">
          <h1>Choose Your City!</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              onKeyDown={e => {
                keyHandler(e.key);
              }}
              id="myInput"
              type="text"
              onChange={e => {
                handleChange(e.target);
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
