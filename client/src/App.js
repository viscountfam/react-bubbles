import React, { useState } from "react";
import PrivateRoute from "./components/PrivateRoutes"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
