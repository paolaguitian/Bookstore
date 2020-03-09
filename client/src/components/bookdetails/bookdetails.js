import React, { Component } from 'react';
import { 
  Button, 
  Card , 
  Descriptions, 
  Skeleton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './css/bookdetails.css'
import AuthorCatalogLink from './authordetails/authorcataloglink'
import AuthorBio from './authordetails/authorcataloglink'

class BookDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading : true,
      book: []
    };
  }

  getBookData = (bookID) => {
    fetch(`/api/books/${bookID}`)
      .then(res => res.json())
      .then(bookdata => this.setState({ book : bookdata, loading : false }, () => console.log("Book data is", bookdata)))
  }

  componentDidMount() {
      this.getBookData(this.props.match.params.bookID);
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.bookID !== prevProps.match.params.bookID){
      this.getBookData(this.props.match.params.bookID);
    }
  }

  render () {  
    const {bookID, title, bookCover, authorAuthorID, price, quantity, publisher, releaseDate} = this.state.book
   
    const stockStatus = () => {
      if (quantity > 20){
        return (<div><h2 className="inStockStatus">In-Stock</h2></div>);
      }
      else if (quantity < 20 && quantity > 0){
        return (<div><h2 className="lowStockStatus">Low-Stock</h2></div>);
      }
      if (quantity === 0){
        return (<div><h2 className="outOfStockStatus">Out-of-Stock</h2></div>);
      }
    }

    return (
      <React.Fragment>
        <Card 
        hoverable
        className="bookDetails"
        bordered={true}
        >
          <div className="bookDetailsCover">
            <img src={`http://localhost:3001/static/${bookCover}`} alt={title} title={title}/>
          </div>

          <div className="bookInfo">
            <Skeleton loading={this.state.loading} active={true}>
            <h1>{title}</h1>
            <AuthorCatalogLink authorAuthorID={authorAuthorID} />
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
            <br />            <Button type="default" size={'large'}>
              Add to Wishlist
            </Button>
            </Skeleton>
          </div>
        </Card>

        <Descriptions className="bookDetailsTable" title="Product Details" layout="vertical" bordered>
          <Descriptions.Item label="Description" span={3}>Book Description</Descriptions.Item>
          <Descriptions.Item label="ISBN" span={3}>{bookID}</Descriptions.Item>
          <Descriptions.Item label="Author Biography" span={3}>{/*<AuthorBio authorAuthorID={authorAuthorID}/>*/}Bio</Descriptions.Item>
          <Descriptions.Item label="Pages" span={3}>YES</Descriptions.Item>
          <Descriptions.Item label="Publisher" span={3}>{publisher}</Descriptions.Item> 
          <Descriptions.Item label="Release Date" span={3}>{releaseDate}</Descriptions.Item>  
        </Descriptions>
      </React.Fragment>
    );
  }
}

export default BookDetails;
