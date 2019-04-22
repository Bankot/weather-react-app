import React, { Component } from "react";
import "./styles/input.css";

class Bdiv extends Component {
  state = {};
  render() {
    return (
      <div
        onClick={() => {
          this.props.update(this.props.value);
          this.props.clear();
        }}
        className="autocomplete-item"
      >
        <strong>
          {this.props.valid[0].toUpperCase()}
          {this.props.valid.substring(1, this.props.valid.length).toLowerCase()}
        </strong>
        {this.props.continue}
      </div>
    );
  }
}

export default Bdiv;
