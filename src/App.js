import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import SoccerTable from "./pages/soccer_table";


class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
          <Router>
          	<Switch>
          		<Route exact path="/" component={Home} />
          		<Route exact path="/soccer_table" component={SoccerTable}/>

          	</Switch>
          </Router>
      </div>
      );
  }
}


export default App;