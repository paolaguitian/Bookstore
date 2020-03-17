import React, { Component } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home/home';
import BookDetails from './components/bookdetails';
import Dashboard from './components/dashboard';
import AuthorCatalog from './components/authordetails/authorcatalog';
import './App.css';
import UserContext from './context';
import ProtectedRoute from './components/protectedRoute';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isLoggedIn: false
    };
  }

  render() {
    return (
      <Router>
        <UserContext.Provider value={{
          state: this.state,
          setState: this.setState.bind(this),
        }}>
        <div>
          <Link to="/"/>
           <Switch>
             <Route path="/" exact component={Home} />
             <Route path="/bookdetails/:bookID" exact component={BookDetails} />
             <Route path="/authorlisting/:authorID" component={AuthorCatalog} />
             <Route path="/?page=:pageNum/?isbn=:bookID" component={BookDetails} />
             <ProtectedRoute path="/dashboard" isLoggedIn={this.state.isLoggedIn} component={Dashboard}/>
           </Switch>
        </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
