import React, { Component } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home/home';
import BookDetails from './components/bookdetails'
import AuthorCatalog from './components/authordetails/authorcatalog'
import './App.css'
import UserContext from './context';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
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
             {/* create private routing and authentication for dashboard */}
             <Route path="/dashboard" component={() => <div>Welcome to `${this.state.user.userID}`'s dashboard!</div>} />
           </Switch>
        </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
