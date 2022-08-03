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
        <Route path="/" component={Home} exact />
        <Route path="/sources" component={Sources} />
        <Route path="/documentation" component={Documentation} />
        <Route path="/gameplay" component={Gameplay} />
        <Route path="/profileselection" component={ProfileSelection} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}
export default App;
