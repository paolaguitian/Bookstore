import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { List } from 'antd'
import BookCard from './bookcard.js';
//import BookDetails from './bookdetails.js/index.js';
import './css/bookcatalog.css';

class BookCatalog extends Component {
  constructor(props) {
    super(props)
    /*This class can be passed a api url as a props to 
    determine how the catalog of books is sorted*/
    this.state = {
      pager: {},
      pageOfBooks : []
    }
  }

  getPageofBooks = () => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.pager.currentPage) {
      fetch(`/api/books/all?page=${page}`, {method : 'GET'})
        .then(res => res.json())
        .then(({pager, pageOfBooks}) => this.setState({pager, pageOfBooks}, () => console.log()))
    }
  }

  componentDidMount() {
    this.getPageofBooks();
  }

  componentDidUpdate() {
    this.getPageofBooks()
  }

  render () {
    const {pager, pageOfBooks} = this.state

    return (
      <div className="homeContainer">
        
        <div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={pageOfBooks}
            renderItem={book => (
              <List.Item>
                <BookCard key={book.bookID} bookID={book.bookID} page={pager.currentPage}/>
              </List.Item>
            )}
          />  
        </div>
        {/*<Route path={`?page=${pager.currentPage}/:bookID`} component={BookPage} />*/}
        <div>
          {pager.pages && pager.pages.length &&
              <ul className="pagination">
                  <li className="pagelink">
                      <Link to={{ search: `?page=1` }}>First</Link>
                  </li>
                  <li className="pagelink">
                      <Link to={{ search: `?page=${pager.currentPage - 1}` }}>Prev</Link>
                  </li>
                  {pager.pages.map(page =>
                      <li key={page}>
                          <Link to={{ search: `?page=${page}` }}>{page}</Link>
                      </li>
                  )}
                  <li className="pagelink">
                      <Link to={{ search: `?page=${pager.currentPage + 1}` }}>Next</Link>
                  </li>
                  <li className="pagelink">
                      <Link to={{ search: `?page=${pager.totalPages}` }}>Last</Link>
                  </li>
              </ul>
          }                    
        </div>
      </div>
    )
  }
}
 
export default BookCatalog;
