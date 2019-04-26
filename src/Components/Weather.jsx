import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import WeatherPanel from "./weatherPanel";
import AnimateLoad from "./anim";
class Weather extends Component {
  state = { weather: [], type: {} };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.weather !== nextState.weather;
  }
  getData() {
    const { city_id } = this.props.match.params;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city_id}&units=metric&appid=c256fc0b3f2c66de09e323592432c5f4`
      )
      .then(res => {
        this.setState(
          { type: res.data.weather[0], weather: res.data.main, error: 0 },
          () => {}
        );
      })
      .catch(error => {
        this.setState({ error: 1 }, () => {});
      });
  }
  componentWillMount() {
    this.getData();
  }

  render() {
    const { temp_min, temp_max } = this.state.weather;
    const { main, description } = this.state.type;
    let possTemps =
      temp_min === temp_max
        ? null
        : `possible temperatures: ${temp_min}-${temp_max}`;

    let finaloutput =
      this.state.error === 0 ? (
        <WeatherPanel
          temp={this.state.weather.temp}
          possTemps={possTemps}
          main={main}
          description={description}
          cityName={this.props.match.params.city_id}
        />
      ) : (
        <div>
          <h1>Weather for this city not found.</h1>
          <p>Please, try again</p>
          <button onClick={this.props.history.goBack}>Back</button>
        </div>
      );

    return (
      <BrowserRouter>
        <div>{finaloutput}</div>
      </BrowserRouter>
    );
  }
}

export default AnimateLoad(Weather);
