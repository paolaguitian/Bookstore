import React, { Component } from 'react';
import {Skeleton} from 'antd';
import '../css/bookcard.css'

class AuthorName extends Component {
    constructor(props) {
      super(props)   
      this.state = {
        loading : true,
        author: []
      }
    }
  
    getAuthorData = (authorID) => {
      fetch(`/api/authors/${authorID}`)
        .then(res => res.json())
        .then(authordata => this.setState({ author : authordata, loading : false}, () => console.log("Author data is", authordata)))
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
            <h4 className="authorTag">{this.state.author.firstName} {this.state.author.lastName}</h4>
          </Skeleton>
        </div>
      );
    }
  }


export default AuthorName;