import { Route, Switch } from 'react-router-dom';
import React from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Gameplay from "./components/Gameplay";
import Leaderboard from "./components/Leaderboard";
import Credits from "./components/Credits";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import ProfileSelection from './components/ProfileSelection';


function App() {
  return (
    <div className="gameshell stack-large">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/credits" component={Credits} />
        <Route path="/gameplay" component={Gameplay} />
        <Route path="/profileselection" component={ProfileSelection} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}
export default App;
