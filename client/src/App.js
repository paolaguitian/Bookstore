import React, { Component } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home/home';
import BookDetails from './components/bookdetails';
import AuthorCatalog from './components/authordetails/authorcatalog';
import './App.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Link to="/"/>
           <Switch>
             <Route path="/" exact component={Home} />
             <Route path="/bookdetails/:bookID" exact component={BookDetails} />
             <Route path="/authorlisting/:authorID" component={AuthorCatalog} />
             <Route path="/?page=:pageNum/?isbn=:bookID" component={BookDetails} />
           </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
