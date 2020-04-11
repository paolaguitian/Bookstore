import './css/sortedCatalog.css';
import React, { Component } from 'react';
import axios from 'axios';
import { List, Pagination } from 'antd';
import BookCard from './bookcard';

var sortByProperty = function (property) {
   return function (x, y) {
      return x[property] === y[property]
         ? 0
         : x[property] > y[property]
         ? 1
         : -1;
   };
};

class SortedCatalog extends Component {
   constructor(props) {
      super(props);
      this.state = {
         numBooks: -1,
         allBooks: [],
         sort: 'title descending',
         loading: true,
      };
   }

   getPageOfBooks = (genre, sort) => {
      if (genre === '-1' || genre === undefined) {
         axios
            .get('/api/books/allNoPages')
            .then((res) => {
               this.setState({
                  numBooks: res.data.numBooks,
                  allBooks: res.data.allBooks,
                  loading: false,
               });
               this.sortBy(sort);
            })
            .catch((error) => {
               console.log(error);
            });
      } else {
         axios
            .get(`/api/books/genre/${genre}`)
            .then((res) => {
               this.setState({
                  numBooks: res.data.numBooks,
                  allBooks: res.data.allBooks,
                  loading: false,
               });
               this.sortBy(sort);
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   sortBy = (sort) => {
      const order = sort.split(' ').splice(-1)[0];
      const category = sort.split(' ').splice(0)[0];
      var sorted = this.state.allBooks;
      //not handling ratings
      switch (category) {
         case 'title':
            sorted.sort(sortByProperty('title'));
            break;
         case 'date':
            sorted.sort(sortByProperty('releaseDate'));
            break;
         case 'price':
            sorted.sort(sortByProperty('price'));
            break;
         default:
      }

      if (order === 'descending') {
         sorted.reverse();
      }

      this.setState({ allBooks: sorted });
   };

   componentDidMount() {
      this.getPageOfBooks(this.props.passgenre, this.props.passsort);
   }

   componentDidUpdate(prevProps) {
      if (
         prevProps.passgenre !== this.props.passgenre ||
         prevProps.passsort !== this.props.passsort
      ) {
         this.getPageOfBooks(this.props.passgenre, this.props.passsort);
      }
   }

   render() {
      const { numBooks, allBooks, loading } = this.state;

      if (numBooks > 0 && loading === false) {
         return (
            <div>
               <div className="sorted-catalog-cards">
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
                     dataSource={allBooks}
                     renderItem={(book) => (
                        <List.Item align="middle">
                           <BookCard key={book.bookID} bookID={book.bookID} />
                        </List.Item>
                     )}
                  />
               </div>
               <div className="pagination">
                  <Pagination
                     size="large"
                     total={numBooks}
                     showSizeChanger
                     defaultPageSize={numBooks}
                     pageSizeOptions={['15', '30', '45']}
                  />
               </div>
            </div>
         );
      } else if (loading === true) {
         return (
            <div className="sorted-catalog-container">
               <div className="sorted-catalog-cards"></div>
            </div>
         );
      }
   }
}

export default SortedCatalog;
