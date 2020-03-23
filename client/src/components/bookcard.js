import React, { Component } from 'react';
import axios from 'axios';
import { Card , Skeleton} from 'antd';
import { Link } from 'react-router-dom'
import './css/bookcard.css';
import AuthorName from './authordetails/authorname';

class BookCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading : true,
      book: []
    };
  }

  getBookData = (bookID) => {
    axios.get(`/api/books/${bookID}`, 
    )
      .then( (res) => {
        this.setState({ book : res.data, loading : false })
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  componentDidMount() {
      this.getBookData(this.props.bookID);
  }

  componentDidUpdate(prevProps) {
    if(this.props.bookID !== prevProps.bookID){
      this.getBookData(this.props.bookID);
    }
  }

  render () {  
    const {bookID, title, bookCover, authorAuthorID, price, genre, publisher} = this.state.book
    return (
      <Card 
      hoverable
      className="bookCard"
      bordered={true}
      >
        <Skeleton loading={this.state.loading} active={true}>
        <img className="bookCover" src={`http://localhost:3001/static/${bookCover}`} alt={title} title={title}/>
        <p><strong>{title}</strong></p>
        <AuthorName authorAuthorID={authorAuthorID} />
        {/*<h5 className="infoTag">ISBN: {bookID}</h5>
        <h5 className="infoTag">Publisher: {publisher}</h5>*/}
        <h5 className="infoTag">Genre: {genre}</h5>
        <h3 className="infoTag">${price}</h3>
        <div className="bookPageLink"><Link to={`/bookdetails/${bookID}`}>View More</Link></div>
        </Skeleton>
       
      </Card>
    );
  }
}
 
export default BookCard;
