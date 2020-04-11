import './css/bookdetails.css';
import React, { Component } from 'react';
import axios from 'axios';
import {
   Button,
   Card,
   Comment,
   Descriptions,
   List,
   Rate,
   Skeleton,
   Tooltip,
} from 'antd';
import AuthorInfo from './authordetails/authorinfo';

class BookDetails extends Component {
   constructor(props) {
      super(props);
      this.modalRef = React.createRef();
      this.imgRef = React.createRef();
      this.modalImgRef = React.createRef();
      this.spanRef = React.createRef();
      this.state = {
         loading: true,
         book: [],
      };
   }

   getBookData = (bookID) => {
      axios
         .get(`/api/books/${bookID}`)
         .then((res) => {
            this.setState({ book: res.data, loading: false });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   toggleCoverZoom = () => {
      this.imgRef.current.onclick = () => {
         this.modalRef.current.style.display = 'block';
         this.modalImgRef.current.src = this.imgRef.current.src;
      };
      this.spanRef.current.onclick = () => {
         this.modalRef.current.style.display = 'none';
      };
   };

   componentDidMount() {
      this.getBookData(this.props.match.params.bookID);
      this.toggleCoverZoom();
   }

   componentDidUpdate(prevProps) {
      if (this.props.match.params.bookID !== prevProps.match.params.bookID) {
         this.getBookData(this.props.match.params.bookID);
      }
   }

   render() {
      const {
         bookID,
         title,
         pages,
         description,
         bookCover,
         authorAuthorID,
         price,
         quantity,
         publisher,
         releaseDate,
      } = this.state.book;

      const stockStatus = () => {
         if (quantity > 20) {
            return (
               <div>
                  <h2 className="inStockStatus">In-Stock</h2>
               </div>
            );
         } else if (quantity < 20 && quantity > 0) {
            return (
               <div>
                  <h2 className="lowStockStatus">Low-Stock</h2>
               </div>
            );
         }
         if (quantity === 0) {
            return (
               <div>
                  <h2 className="outOfStockStatus">Out-of-Stock</h2>
               </div>
            );
         }
      };

      return (
         <div className="bookPage">
            <Card hoverable className="bookDetails" bordered={true}>
               <div className="bookDetailsCover">
                  <img
                     ref={this.imgRef}
                     id="coverImage"
                     src={`http://localhost:3001/static/${bookCover}`}
                     alt={title}
                     title={title}
                  />
               </div>
               <div ref={this.modalRef} id="coverModal" className="modal">
                  <span ref={this.spanRef} className="close">
                     &times;
                  </span>
                  <img
                     ref={this.modalImgRef}
                     className="modal-content"
                     id="enlargedCover"
                  />
               </div>

               <div className="bookInfo">
                  <Skeleton loading={this.state.loading} active={true}>
                     <h1>{title}</h1>
                     <AuthorInfo data="link" authorAuthorID={authorAuthorID} />
                     {/*Ratings have no connection to the backend. This is just the UI for it.*/}
                     <Rate allowClear={false} allowHalf defaultValue={4.5} />
                     <br />
                     <h1>${price}</h1>
                     {stockStatus()}
                     <br />
                     <br />
                     <Button type="default" size={'large'}>
                        Add to Cart
                     </Button>
                     <br />
                     <br />
                     <br />{' '}
                     <Button type="default" size={'large'}>
                        Add to Wishlist
                     </Button>
                  </Skeleton>
               </div>
            </Card>

            <Descriptions
               className="bookDetailsTable"
               title="Product Details"
               layout="vertical"
               bordered
            >
               <Descriptions.Item label="Description" span={3}>
                  {description}
               </Descriptions.Item>
               <Descriptions.Item label="ISBN" span={3}>
                  {bookID}
               </Descriptions.Item>
               <Descriptions.Item label="Author Biography" span={3}>
                  <AuthorInfo data="bio" authorAuthorID={authorAuthorID} />
               </Descriptions.Item>
               <Descriptions.Item label="Pages" span={3}>
                  {pages}
               </Descriptions.Item>
               <Descriptions.Item label="Publisher" span={3}>
                  {publisher}
               </Descriptions.Item>
               <Descriptions.Item label="Release Date" span={3}>
                  {releaseDate}
               </Descriptions.Item>
            </Descriptions>
            <h3 style={{ fontWeight: 'bold' }}>Reviews</h3>
            <br />
            <br />
         </div>
      );
   }
}

export default BookDetails;
