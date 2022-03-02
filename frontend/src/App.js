import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Home from "./components/home";
import Add from "./components/add";


class App extends Component{
  render(){
  	return(
  		<div>
  		<nav className="navbar navbar-expand navbar-dark bg-dark ">
          <a href="/home" className="navbar-brand ">
            Digimon Card Prices
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="web-content mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={["/", "/add"]} component={Add} />
          </Switch>
        </div>
      </div>
  	);
  }
}
export default App;
