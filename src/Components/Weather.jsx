import React, { Component } from "react";
import axios from "axios";
class Weather extends Component {
  state = { weather: [] };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.weather != nextState.weather;
  }
  getData() {
    const { city_id } = this.props.match.params;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city_id}&units=metric&appid=c256fc0b3f2c66de09e323592432c5f4`
      )
      .then(e => {
        this.setState({ weather: e.data.main }, () => {});
      });
  }
  componentWillMount() {
    this.getData();
  }
  render() {
    console.log("render");

    return (
      <div>
        <h1>Temperature: {this.state.weather.temp}</h1>
        <h1>
          possible temperatures: {this.state.weather.temp_min}-
          {this.state.weather.temp_max}
        </h1>
      </div>
    );
  }
}

export default Weather;
