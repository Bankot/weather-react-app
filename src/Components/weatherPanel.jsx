import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles/weatherPanel.css";

class WeatherPanel extends Component {
  state = { type: "" };
  componentWillMount() {
    let typeOfWeather = this.props.main;
    switch (typeOfWeather) {
      case "Rain":
        this.setState({ type: "Rain" });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className={"weather-container"}>
        <div className={this.state.type}>
          <h1>Temperature: {this.props.temp}</h1>
          <h1>{this.props.possTemps}</h1>
          <h2>Type of weather: {this.props.main}</h2>
          <h3>{this.props.description}</h3>
          <button onClick={this.props.history.goBack}>back</button>
        </div>
      </div>
    );
  }
}

export default withRouter(WeatherPanel);
