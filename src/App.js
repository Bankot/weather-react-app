import React, { Component } from "react";
import Weather from "./Components/Weather";
import { BrowserRouter, Route } from "react-router-dom";
import MainWindow from "./Components/mainWindow";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Route exact path="/" component={MainWindow} />
          <Route path="/:city_id&:units" component={Weather} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
