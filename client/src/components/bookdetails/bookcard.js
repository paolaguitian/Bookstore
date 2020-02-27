import React, { Component } from 'react';
import { Card } from 'antd';
import AuthorName from './authorname.js'
import './bookcard.css'

class BookCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: []
    };
  }

  getBookData = (bookID) => {
    fetch(`/api/books/${bookID}`)
      .then(res => res.json())
      .then(bookdata => this.setState({ book : bookdata }, () => console.log("Book data is", bookdata)))
  }

  componentDidMount() {
      this.getBookData(this.props.bookID);
  }

  render () {  
    const {bookID, title, bookCover, authorAuthorID, sales, genre} = this.state.book
    return (
      <Card 
      hoverable
      className="bookCard"
      cover={<img className="bookCover" src={`http://localhost:3001/static/${bookCover}`} alt={title} title={title}/>}>
        <AuthorName authorAuthorID={authorAuthorID} />
        <h5 className="infoTag">ISBN: {bookID}</h5>
        <h5 className="infoTag">Genre: {genre}</h5>
      </Card>
    );
  }
}
 
export default BookCard;
