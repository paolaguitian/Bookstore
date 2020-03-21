import React, { Component } from 'react';
import axios from 'axios';
import {Skeleton} from 'antd';
import '../css/bookdetails.css';

class AuthorBio extends Component {
    constructor(props) {
      super(props)   
      this.state = {
        loading : true,
        author: []
      }
    }
  
    getAuthorData = (authorID) => {
      axios.get(`/api/authors/${authorID}`)
        .then( (res) => {
          this.setState({ author : res.data, loading : false})
        })
        .catch( (error) => {
          console.log(error);
        })
    }
  
    componentDidMount() {
      this.getAuthorData(this.props.authorAuthorID)
    }
  
    componentDidUpdate(prevProps) {
      if(this.props.authorAuthorID !== prevProps.authorAuthorID){
        this.getAuthorData(this.props.authorAuthorID);
      }
    };    
  
    render () {
      return (
        <div>
          <Skeleton loading={this.state.loading}>
            <p>{this.state.author.bio}</p>
          </Skeleton>
        </div>
      );
    }
  }


export default AuthorBio;