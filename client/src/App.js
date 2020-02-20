import React, { Component, Fragment } from 'react';
import BookInfo from './components/bookdetails/bookinfo.js'

class App extends Component {
  
  render () {
    return (
      <Fragment>     
        {/*Was used to test if react and express are connected by fetching /api/books
        when <BookInfo /> component mounts.*/}   
      
        
        {/* <Home /> */}
        <BookInfo />
      </Fragment>
    );
  }
}

export default App;
