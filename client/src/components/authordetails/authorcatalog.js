import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import BookCard from '../bookcard.js';
import '../css/authorcatalog.css';
import AuthorName from './authorname';

class AuthorCatalog extends Component {
  constructor(props) {
    super(props)
    /*This class can be passed a api url as a props to 
    determine how the catalog of books is sorted*/
    this.state = {
      pager: {},
      pageOfBooks : []
    }
  }

  getPageOfAuthorBooks = (authorID) => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.pager.currentPage) {
      axios.get(`/api/books/authorbooks/${authorID}`, {
        params : {
          page: page
        }
      })
        .then( (res) => {
          this.setState({ pager : res.data.pager, pageOfBooks: res.data.pageOfBooks})
        })
        .catch( (error) => {
          console.log(error);
        })
    }
  }

  componentDidMount() {
    this.getPageOfAuthorBooks(this.props.match.params.authorID);
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.authorID !== prevProps.match.params.authorID) {
      this.getPageOfAuthorBooks(this.props.match.params.authorID)
    }
  }

  render () {
    const {pager, pageOfBooks} = this.state

    return (
      
      <div className="homeContainer">
        <AuthorName authorAuthorID={this.props.match.params.authorID} />
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
              <li className={`pagebutton ${pager.currentPage === 1 ? 'invisible' : ''}`}>
                  <Link to={{ search: `?page=1` }}>First</Link>
              </li>
              <li className={`pagebutton ${pager.currentPage === 1 ? 'invisible' : ''}`}>
                  <Link to={{ search: `?page=${pager.currentPage - 1}` }}>Prev</Link>
              </li>
              {pager.pages.map(page =>
                  <li key={page} className={`pagebutton ${pager.currentPage === page ? 'active' : ''}`}>
                      <Link to={{ search: `?page=${page}` }}>{page}</Link>
                  </li>
              )}
              <li className={`pagebutton ${pager.currentPage === pager.totalPages ? 'invisible' : ''}`}>
                  <Link to={{ search: `?page=${pager.currentPage + 1}` }}>Next</Link>
              </li>
              <li className={`pagebutton ${pager.currentPage === pager.totalPages ? 'invisible' : ''}`}>
                  <Link to={{ search: `?page=${pager.totalPages}` }}>Last</Link>
              </li>
            </ul>
          }                    
        </div>
      </div>
      
    )
  }
}
 
export default AuthorCatalog;
