import './css/sortedCatalog.css';
import React, { Component } from 'react';
import axios from 'axios';
import { List, Spin, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BookCard from './bookcard';
import Sorter from '../components/sorter';

var sortByProperty = function (property) {
   return function (x, y) {
      return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
   };
};

class SortedCatalog extends Component {
   constructor(props) {
      super(props);
      this.state = {
         numBooks: -1,
         allBooks: [],
         genre: 'Education',
         sort: 'date ascending',
         loading: true,
      };
   }

   getPageOfBooks = () => {
      if (this.state.genre === '-1') {
         axios
            .get('/api/books/allNoPages')
            .then((res) => {
               this.setState({
                  numBooks: res.data.numBooks,
                  allBooks: res.data.allBooks,
                  loading: false,
               });
               this.sortBy()
            })
            .catch((error) => {
               console.log(error);
            });
      } else {
         axios
            .get(`/api/books/genre/${this.state.genre}`)
            .then((res) => {
               this.setState({
                  numBooks: res.data.numBooks,
                  allBooks: res.data.allBooks,
                  loading: false,
               });
               this.sortBy()
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   sortBy = () => {
      const order = this.state.sort.split(" ").splice(-1)[0];
      const category = this.state.sort.split(" ").splice(0)[0];
      var sorted = this.state.allBooks;
      //not handling ratings
      switch (category) {
         case "title":
            sorted.sort(sortByProperty("title"));
            break;
         case "date":
            sorted.sort(sortByProperty("releaseDate"));
            break;
         case "price":
            sorted.sort(sortByProperty("price"));
            break;
         case "author":
            sorted.sort(sortByProperty("author"));
            break;
         default:
            //ratings error catch
      }

      if (order === "descending") {
         sorted.reverse();
      }
      this.setState({ allBooks: sorted });
      console.log(sorted);
   };

   componentDidMount() {
      this.getPageOfBooks();
   }

   render() {
      const { numBooks, allBooks, loading } = this.state;
      const spinnerIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

      if (numBooks > 0 && loading === false) {
         return (
            <div className="sorted-catalog-container">
               <Sorter />
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
                        <List.Item>
                           <BookCard
                              key={book.bookID}
                              bookID={book.bookID}
                           />
                        </List.Item>
                     )}
                  />
               </div>
               <div className="pagination">
                  <Pagination size="large" total={numBooks} showSizeChanger />
               </div>
            </div>
         );
      } else if (loading === true) {
         return (
            <div className="sorted-catalog-container">
               <div className="sorted-catalog-cards">
                  <Spin
                     indicator={spinnerIcon}
                     style={{ textAlign: 'center' }}
                  />
               </div>
            </div>
         );
      }
   }
}

export default SortedCatalog;
