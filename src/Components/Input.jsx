import React, { Component } from "react";
import arr from "../names.jsx";
import "./styles/input.css";
import Bdiv from "./Bdiv";
import { Link } from "react-router-dom";
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

    const clearCollection = () => {
      this.setState({ collection: [] }, () => {});
    };
    const handleChange = e => {
      clearCollection();

      this.setState({ actual: e.target.value }, () => {
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
    return (
      <div>
        <form autoComplete="off">
          <div className="autocomplete">
            <input
              id="myInput"
              type="text"
              onChange={e => {
                handleChange(e);
              }}
            />
          </div>
          <button>
            <Link to={"/" + result}>Submit</Link>
          </button>
        </form>
        {this.state.collection}
      </div>
    );
  }
}

export default Input;
