import React, { Component } from "react";
import arr from "../names.jsx";
import "./styles/input.css";
import Bdiv from "./Bdiv";
import { withRouter } from "react-router-dom";
import video from "./movies/Main-movie.mp4";
import AnimateLoad from "./anim";

class Input extends Component {
  state = {
    baseArray: arr,
    suggestionCounter: 0,
    collection: [],
    actual: "",
    counter: 0
  };

  render() {
    let counter = this.state.counter;
    let collection = [];
    const update = c => {
      let select = document.getElementById("unitchecker");
      document.getElementById("myInput").value = c;
      this.props.history.push(
        "/" + c + "&units=" + select.options[select.selectedIndex].value
      );
    };
    const handleSubmit = e => {
      let select = document.getElementById("unitchecker");
      e.preventDefault();
      if (document.getElementsByClassName("autocomplete-item-active").length) {
        this.props.history.push(
          "/" +
            document.getElementsByClassName("autocomplete-item-active")[0]
              .innerText +
            "&units=" +
            select.options[select.selectedIndex].value
        );
      } else {
        this.props.history.push(
          "/" +
            result.trim() +
            "&units=" +
            select.options[select.selectedIndex].value
        );
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
    const scroller = (numberOfChilds, upOrDown) => {
      let height = document.getElementsByClassName("autocomplete-item")[0]
        .offsetHeight;
      switch (upOrDown) {
        case "Up":
          document.getElementById("collection").scrollBy(0, -height);
          break;
        case "Down":
          document.getElementById("collection").scrollBy(0, height);
          break;
        default:
          break;
      }
    };
    const scrollerReset = () => {
      document.getElementById("collection").scrollBy(0, -1111111111);
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
          if (e === "ArrowDown") {
            if (
              suggestionCounter >=
              document.getElementById("collection").childNodes.length - 1
            ) {
              //================= RESET =============================================
              suggestionCounter = 0;
              scrollerReset();
              classRemove();
              classAdd(suggestionCounter);
            } else {
              suggestionCounter = indexChecker(arrayOfItems) + 1;
              if (suggestionCounter > 4) {
                scroller(
                  document.getElementById("collection").childNodes.length,
                  "Down"
                );
              }
              classRemove();
              classAdd(suggestionCounter);
            }
          }
          if (e === "ArrowUp" && indexChecker(arrayOfItems) >= 1) {
            suggestionCounter = indexChecker(arrayOfItems) - 1;
            if (
              suggestionCounter <
              document.getElementById("collection").childNodes.length - 5
            ) {
              scroller(
                document.getElementById("collection").childNodes.length,
                "Up"
              );
            }
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
    return (
      <div className="main-wrapper">
        <video
          onClick={clearCollection}
          preload="auto"
          className="weather-vid"
          loop
          autoPlay={true}
          muted
        >
          <source type="video/mp4" src={video} loop={true} muted />
        </video>
        <p id="unitchecker-label">Choose Units: </p>
        <select id="unitchecker">
          <option value="metric">Metrical</option>
          <option value="imperial">Imperial</option>
        </select>

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
            <button type="submit">
              <span>></span>
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
