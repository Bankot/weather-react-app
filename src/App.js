import React, { Component } from "react";
import Input from "./Components/Input";
import Weather from "./Components/Weather";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Input} />
          <Route path="/:city_id" component={Weather} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
