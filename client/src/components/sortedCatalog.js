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
         allBooks: []
      };
   }

   getPageOfBooks = (genre, sort, location, rating) => {
      if (location === "home") {
         if (genre === '-1' || genre === undefined) {
            axios
               .get(`/api/books/allBooks/${rating}`)
               .then((res) => {
                  this.setState({
                     numBooks: res.data.numBooks,
                     allBooks: res.data.allBooks
                  });
                  this.sortBy(sort);
               })
               .catch((error) => {
                  console.log(error);
               });
         } else {
            axios
               .get(`/api/books/allBooks/${genre}/${rating}`)
               .then((res) => {
                  this.setState({
                     numBooks: res.data.numBooks,
                     allBooks: res.data.allBooks
                  });
                  this.sortBy(sort);
               })
               .catch((error) => {
                  console.log(error);
               });
         }
      } else if (location === "bestsellers") {
         if (genre === '-1' || genre === undefined) {
            axios
               .get(`/api/books/bestsellers/${rating}`)
               .then((res) => {
                  this.setState({
                     numBooks: res.data.numBooks,
                     allBooks: res.data.allBooks
                  });
                  this.sortBy(sort);
               })
               .catch((error) => {
                  console.log(error);
               });
         } else {
            axios
               .get(`/api/books/bestsellers/${genre}/${rating}`)
               .then((res) => {
                  this.setState({
                     numBooks: res.data.numBooks,
                     allBooks: res.data.allBooks
                  });
                  this.sortBy(sort);
               })
               .catch((error) => {
                  console.log(error);
               });
         }
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
      this.getPageOfBooks(this.props.genre, this.props.sort, this.props.location, this.props.rating);
   }

   componentDidUpdate(prevProps) {
      if (
         prevProps.genre !== this.props.genre ||
         prevProps.sort !== this.props.sort  ||
         prevProps.rating !== this.props.rating
      ) {
         this.getPageOfBooks(this.props.genre, this.props.sort, this.props.location, this.props.rating);
      }
   }

   render() {
      const { numBooks, allBooks } = this.state;

      if (numBooks > 0) {
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
                     defaultPageSize={15}
                     pageSizeOptions={['15', '30', '45']}
                  />
               </div>
            </div>
         );
      }
      else { return (<div></div>); }
   }
}

export default SortedCatalog;
