import React, { Component } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home/home';
import NavBar from './components/navbar';
import AboutUs from './views/aboutus/aboutus'
import BookDetails from './components/bookdetails';
import Dashboard from './components/dashboard';
import AuthorCatalog from './components/authordetails/authorcatalog';
import './App.css';
import UserContext from './context';
import ProtectedRoute from './components/protectedRoute';
import BookCatalog from './components/bookcatalog';


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
        <NavBar />
        <div className="maincontent">
           <Switch>
            <Route path="/" exact component={Home} />
             <Route path="/home" exact component={Home} />
             <Route path="/shop" exact component={BookCatalog} />
             <Route path="/about" exact component={AboutUs} />
             <Route path="/bookdetails/:bookID" exact component={BookDetails} />
             <Route path="/authorlisting/:authorID" component={AuthorCatalog} />
             <ProtectedRoute path="/dashboard" isLoggedIn={this.state.isLoggedIn} component={Dashboard}/>
           </Switch>
        </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
