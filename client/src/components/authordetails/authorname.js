import React, { Component } from 'react';
import axios from 'axios';
import {Skeleton} from 'antd';
import '../css/bookcard.css';

class AuthorName extends Component {
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
            <h4 className="authorTag">{this.state.author.firstName} {this.state.author.lastName}</h4>
          </Skeleton>
        </div>
      );
    }
  }


export default AuthorName;