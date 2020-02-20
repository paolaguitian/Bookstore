import React, { Component } from 'react';

class BookInfo extends Component {
  constructor() {
    super()
    this.state = {
      allBooks: []
    }
  }

  componentDidMount() {
    fetch('/api/books')
    //img url. author, year nblah
      .then(res => res.json)
      .then(allBooks => this.setState({ allBooks }, () => console.log(allBooks)))
  }

  render () {
    return (
      // const { image, author} = this.state.allbooks;
      //loop through this.state.allbooks : <img src={image}>  </img>
      // <h1>{this.state.allbooks.author}</h1>
      
      <div>
        <h1>Books</h1>
      </div>
    );
  }
}
 
export default BookInfo;
