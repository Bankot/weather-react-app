import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles/input.css";
import Clouds from "./movies/Clouds-movie.mp4";
import Rain from "./movies/Rain-movie.mp4";
import Clear from "./movies/Clear-movie.mp4";
import Drizzle from "./movies/Drizzle-movie.mp4";
import Thunderstorm from "./movies/Thunderstorm-movie.mp4";

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
    let unitSymbol = "";
    switch (this.props.units) {
      case "units=metric":
        unitSymbol = "°C";
        break;
      case "units=imperial":
        unitSymbol = "°F";
        break;
      default:
        break;
    }
    const chooseVideo = a => {
      switch (a) {
        case "Rain":
          return Rain;

        case "Clouds":
          return Clouds;

        case "Clear":
          return Clear;

        case "Drizzle":
          return Drizzle;

        case "Thunderstorm":
          return Thunderstorm;

        default:
          console.log("default");
      }
    };
    let possTempUnit = this.props.possTemps ? unitSymbol : "";
    return (
      <div className={"weather-container"}>
        <video
          preload="auto"
          className="weather-vid"
          loop
          autoPlay={true}
          muted
        >
          <source
            type="video/mp4"
            src={chooseVideo(this.props.main)}
            loop={true}
            muted
          />
        </video>
        <div>
          <h1 id="weatherPanel-cityName">{this.props.cityName}</h1>
          <h1>
            Temperature: {this.props.temp}
            {unitSymbol}
          </h1>
          <h1>
            {this.props.possTemps}
            {possTempUnit}
          </h1>
          <h2>Type of weather: {this.props.main}</h2>
          <h3>{this.props.description}</h3>
          <button onClick={this.props.history.goBack}>back</button>
        </div>
      </div>
    );
  }
}

export default withRouter(WeatherPanel);
