import React, { Component } from 'react';

class AuthorName extends Component {
 
  constructor(props) {
    super(props)   
    this.state = {
      author: []
    }
  }

  getAuthorData = (authorID) => {
    fetch(`/api/authors/${authorID}`)
      .then(res => res.json())
      .then(authordata => this.setState({ author : authordata}, () => console.log("Author data is", authordata)))
  }

  componentDidUpdate(prevProps) {
    if(this.props.authorAuthorID !== prevProps.authorAuthorID){
      this.getAuthorData(this.props.authorAuthorID);
    }
  };    

  render () {
    return (
      <div>
        <h4>By: {this.state.author.firstName} {this.state.author.lastName}</h4>
      </div>
    );
  }
}
 
export default AuthorName;
