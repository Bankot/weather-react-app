import React, { Component } from "react";

class Bdiv extends Component {
  state = {};
  render() {
    return (
      <div
        onClick={() => {
          this.props.clear();
          this.props.update(this.props.ownId);
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
