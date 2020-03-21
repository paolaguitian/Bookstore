import React, { Component } from 'react';
import axios from 'axios';
import { 
  Button, 
  Card , 
  Descriptions, 
  Skeleton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './css/bookdetails.css';
import AuthorCatalogLink from './authordetails/authorcataloglink';
import AuthorBio from './authordetails/authorbio';

class BookDetails extends Component {
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
      this.getBookData(this.props.match.params.bookID);
      let modal = document.getElementById("coverModal");

      let img = document.getElementById("coverImage");
      let modalImg = document.getElementById("enlargedCover")
      img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
      }
      let span = document.getElementsByClassName("close")[0];
      span.onclick = function() {
        modal.style.display = "none";
      }
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.bookID !== prevProps.match.params.bookID){
      this.getBookData(this.props.match.params.bookID);
    }
  }

  render () {  
    const {bookID, title, pages, description, bookCover, authorAuthorID, price, quantity, publisher, releaseDate} = this.state.book;
   
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
      <div className="bookPage">
        <Card 
        hoverable
        className="bookDetails"
        bordered={true}
        >
          <div className="bookDetailsCover">
            <img id="coverImage" src={`http://localhost:3001/static/${bookCover}`} alt={title} title={title}/>
          </div>
          
          <div id="coverModal" className="modal">
            <span className="close">&times;</span>
            <img className="modal-content" id="enlargedCover" />
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
          <Descriptions.Item label="Description" span={3}>{description}</Descriptions.Item>
          <Descriptions.Item label="ISBN" span={3}>{bookID}</Descriptions.Item>
          <Descriptions.Item label="Author Biography" span={3}>{/*bio*/}</Descriptions.Item>
          <Descriptions.Item label="Pages" span={3}>{pages}</Descriptions.Item>
          <Descriptions.Item label="Publisher" span={3}>{publisher}</Descriptions.Item> 
          <Descriptions.Item label="Release Date" span={3}>{releaseDate}</Descriptions.Item>  
        </Descriptions>
      </div>
    );
  }
}

export default BookDetails;
