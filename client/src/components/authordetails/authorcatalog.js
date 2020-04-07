import '../css/authorcatalog.css';
import React, { Component } from 'react';
import axios from 'axios';
import { List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BookCard from '../bookcard';
import AuthorInfo from './authorinfo';
import PageSwitcher from '../pageswitcher';

class AuthorCatalog extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pager: {},
         pageOfBooks: [],
         loading: true,
      };
   }

   getPageOfAuthorBooks = (authorID) => {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get('page')) || 1;
      if (page !== this.state.pager.currentPage) {
         axios
            .get(`/api/books/authorbooks/${authorID}`, {
               params: {
                  page: page,
               },
            })
            .then((res) => {
               this.setState({
                  pager: res.data.pager,
                  pageOfBooks: res.data.pageOfBooks,
                  loading: false,
               });
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   componentDidMount() {
      this.getPageOfAuthorBooks(this.props.match.params.authorID);
   }

   componentDidUpdate(prevProps) {
      if (
         this.props.match.params.authorID !== prevProps.match.params.authorID
      ) {
         this.getPageOfAuthorBooks(this.props.match.params.authorID);
      }
   }

   render() {
      const { pager, pageOfBooks, loading } = this.state;
      const spinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      if (loading === true) {
         return (
            <Spin indicator={spinnerIcon} style={{ textAlign: 'center' }} />
         );
      } else if (loading === false) {
         return (
            <div className="book-catalog-container">
               <h2>
                  More books by...{' '}
                  <AuthorInfo
                     data="name"
                     authorAuthorID={this.props.match.params.authorID}
                  />
               </h2>
               <br />
               <div className="book-catalog-cards">
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
                     renderItem={(book) => (
                        <List.Item align="middle">
                           <BookCard
                              key={book.bookID}
                              bookID={book.bookID}
                              page={pager.currentPage}
                           />
                        </List.Item>
                     )}
                  />
               </div>
               <PageSwitcher pager={pager} />
            </div>
         );
      }
   }
}

export default AuthorCatalog;
