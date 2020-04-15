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
                     <CustomRating bookID={bookID} />
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

            <CommentList bookID={bookID} />
            <br />
            <br />
         </div>
      );
   }
}

class CustomRating extends Component {
   constructor(props) {
      super(props);
      this.state = {
         rating: null,
      };
   }

   getBookRating = (bookID) => {
      const ratingData = reviewData.filter((item) => {
         return item.bookID == bookID;
      });

      const rating =
         ratingData.reduce((total, next) => total + next.rating, 0.0) /
         ratingData.length;

      this.setState({ rating });
   };

   componentDidMount() {
      this.getBookRating(this.props.bookID);
   }

   componentDidUpdate(prevProps) {
      if (this.props.bookID !== prevProps.bookID) {
         this.getBookRating(this.props.bookID);
      }
   }
   render() {
      const { rating } = this.state;
      //console.log(rating);

      if (this.state.rating === null) {
         return <div>No Rating Data</div>;
      } else if (this.state.rating >= 0.0) {
         return (
            <div>
               <Rate
                  allowClear={false}
                  allowHalf
                  defaultValue={this.state.rating}
               />
            </div>
         );
      } else {
         return (
            <div>
               <Rate
                  allowClear={false}
                  allowHalf
                  defaultValue={this.state.rating}
               />
            </div>
         );
      }
   }
}

class CommentList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         commentData: [],
      };
   }

   getListOfComments = (bookID) => {
      const commentData = reviewData.filter((item) => {
         return item.bookID == bookID;
      });

      //console.log('Comment Data:', commentData);
      this.setState({ commentData });
   };

   componentDidMount() {
      this.getListOfComments(this.props.bookID);
   }

   componentDidUpdate(prevProps) {
      if (this.props.bookID !== prevProps.bookID) {
         this.getListOfComments(this.props.bookID);
      }
   }

   render() {
      const { commentData } = this.state;

      if (commentData === null && this.props.bookID === null) {
         return <div>No Comments</div>;
      } else if (commentData !== null && this.props.bookID !== null) {
         return (
            <div>
               <List
                  className="commentList"
                  align="middle"
                  style={{
                     textAlign: 'left',
                     marginLeft: '20%',
                     marginRight: '20%',
                  }}
                  itemLayout="horizontal"
                  dataSource={commentData}
                  renderItem={(item) => (
                     <List.Item align="middle">
                        <Comment
                           author={item.userID}
                           content={item.comment}
                           datetime={item.timeStamp}
                        />
                     </List.Item>
                  )}
               />
            </div>
         );
      }
   }
}

const reviewData = [
   {
      timeStamp: '2020-04-12 17:41:52',
      comment:
         'Loved the book, fast paced and always kept me at the edge of my seat.',
      rating: 4.9,
      bookID: '978-0123456790',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:17:11',
      comment: 'Alright love story if a bit overwritten.',
      rating: 3.2,
      bookID: '978-0123456791',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:17:11',
      comment:
         'Interesting approach to monster slayers - defining a new genre of good bad guys.',
      rating: 4.3,
      bookID: '978-0123456792',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:19:02',
      comment: "Not really sure what this one means but I'd classify it as PG?",
      rating: 2,
      bookID: '978-0123456793',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:19:02',
      comment:
         'Incredible commentary on a book that launched on of the biggest revolutions in action writing.',
      rating: 4.9,
      bookID: '978-0123456794',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:19:02',
      comment:
         'Am time traveler, currently re-evaluating my identity. Thanks Jamie.',
      rating: 3.4,
      bookID: '978-0123456795',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:20:29',
      comment:
         'Even better the the prequel, Some Creepy Place, this time exploring Brickell at 9pm during the quarantine. A must read.',
      rating: 4,
      bookID: '978-0123456796',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:20:29',
      comment: 'By getting people to buy this horrible book, it sucks.',
      rating: 0,
      bookID: '978-0123456797',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:20:29',
      comment:
         "Basics of what? Hint: it's the first tenet of cell theory. Great for my intro cell bio class.",
      rating: 4.2,
      bookID: '978-0123456798',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:21:32',
      comment: "Creepy but I'm still thinking about it 4 days later.",
      rating: 3,
      bookID: '978-0123456799',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:21:42',
      comment: 'Makes me crave hearing the recess bell, pass.',
      rating: 1.9,
      bookID: '978-0123456800',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:23:36',
      comment: 'Brings tears to my eyes.',
      rating: 2.4,
      bookID: '978-0132847377',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:22:02',
      comment: 'Top notch, quality textbook, highly recommend.',
      rating: 5,
      bookID: '978-0137043293',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-10 10:12:44',
      comment: 'Amazing teachings of the scrum work flow!',
      rating: 5,
      bookID: '978-0137043293',
      userID: 'randoUser',
   },
   {
      timeStamp: '2020-04-12 18:22:17',
      comment:
         'Thanks to Gayle, I managed to get that 3 figure job I really wanted!',
      rating: 3.9,
      bookID: '978-0984782857',
      userID: 'Jose3',
   },
   {
      timeStamp: '2020-04-12 18:22:30',
      comment: 'Better tutorials on Youtube - save your money.',
      rating: 2.5,
      bookID: '978-1720043997',
      userID: 'Jose3',
   },
];

export default BookDetails;
