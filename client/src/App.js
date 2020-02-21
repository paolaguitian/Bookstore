import React, { Component } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home/home';
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Link to="/"/>
           <Switch>
             <Route path="/">
                 <Home/>
             </Route>
           </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
