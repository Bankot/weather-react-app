import React, { Component } from "react";
import "./styles/input.css";

class Bdiv extends Component {
  state = {};
  render() {
    let classN = "autocomplete-item";
    return (
      <div
        onMouseEnter={() => {
          this.props.classRemove();
          this.props.classAdd(this.props.ownId - 1);
        }}
        onMouseLeave={() => {
          this.props.classRemove();
        }}
        onClick={() => {
          this.props.update(this.props.value);
        }}
        className={classN}
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
