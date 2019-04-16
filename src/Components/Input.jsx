import React, { Component } from "react";
import arr from "./arr";
import "./styles/input.css";
import Bdiv from "./Bdiv";
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
      this.setState({ actual: c });
      console.log(this.state.actual);
    };
    const clearCollection = () => {
      this.setState({ collection: [] });
    };
    const handleChange = e => {
      clearCollection();

      let val = e.target.value;
      if (!val) {
        return false;
      }
      //closeAllLists();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          console.log(counter);
          collection.push(
            <Bdiv
              key={counter++}
              ownId={counter++}
              valid={val}
              continue={arr[i].substr(val.length)}
              clear={clearCollection}
              update={c => {
                update(c);
              }}
            />
          );
        }
      }
      this.setState({ collection: collection });
    };
    return (
      <div>
        <form autoComplete="off" action="/action_page.php">
          <div className="autocomplete">
            <input
              id="myInput"
              type="text"
              name="myCountry"
              placeholder="Country"
              onChange={e => {
                handleChange(e);
              }}
            />
          </div>
          <input type="submit" />
        </form>
        {this.state.collection}
      </div>
    );
  }
}

export default Input;
