import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from "./components/About/About";
import CreateGame from "./components/creategame/creategame";
import GameDetails from "./components/GameDetails/GameDetails";
import Landing from './components/Landing/Landing';
import Page404 from "./components/Page404/Page404";
import Videogames from "./components/Videogames/Videogames";
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/videogames" component={Videogames} />
          <Route exact path="/creategame" component={CreateGame} />
          <Route exact path='/videogame/:idVideogame' component={GameDetails} />
          <Route exact path='/about' component={About} />
          <Route path='*' component={Page404} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;