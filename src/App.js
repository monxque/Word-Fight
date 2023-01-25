import { Route, Switch } from 'react-router-dom';
import React from "react";
import Home from "./components/Home";
import Gameplay from "./components/Gameplay";
import Leaderboard from "./components/Leaderboard";
import Documentation from "./components/Documentation";
import Sources from "./components/Sources";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import ProfileSelection from './components/ProfileSelection';


function App() {
  return (
    <div className="gameshell stack-large">
      <Navbar />
      <Switch>
        <Route path="/Word-Fight" component={Home} exact />
        <Route path="/Word-Fight/sources" component={Sources} />
        <Route path="/Word-Fight/documentation" component={Documentation} />
        <Route path="/Word-Fight/gameplay" component={Gameplay} />
        <Route path="/Word-Fight/profileselection" component={ProfileSelection} />
        <Route path="/Word-Fight/leaderboard" component={Leaderboard} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}
export default App;
