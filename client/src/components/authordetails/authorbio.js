import React, { Component } from 'react';
import '../css/bookdetails.css'

class AuthorBio extends Component {
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
  
    componentDidMount() {
      this.getAuthorData(this.props.authorAuthorID)
    }
  
    componentDidUpdate(prevProps) {
      if(this.props.authorAuthorID !== prevProps.authorAuthorID){
        this.getAuthorData(this.props.authorAuthorID);
      }
    };*   
  
    render () {
      const {bio} = this.state.author;
      return (
        <React.Fragment>
         <p>{bio}</p>
        </React.Fragment>
      );
    }
  }

  export default AuthorBio;