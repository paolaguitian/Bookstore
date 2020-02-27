import React, { Component } from 'react';
import BookCard from './bookcard.js';
import {Col, Row} from 'antd';
import './bookcard.css';

class HomeBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allBooks: []
    }
  }

  componentDidMount() {
    fetch('/api/books/all')
      .then(res => res.json())
      .then(allBooks => this.setState({allBooks}, () => console.log(allBooks)))
  }

  render () {
    
    const homeBooks = this.state.allBooks.map((book) => ( 
          <BookCard bookID={book.bookID} />
    ));

    return (
      <div>
          {homeBooks}
      </div>
    )
  }
}
 
export default HomeBooks;
