import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from 'antd';

class AuthorInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         author: [],
      };
   }

   getAuthorData = (authorID) => {
      axios
         .get(`/api/authors/${authorID}`)
         .then((res) => {
            this.setState({ author: res.data, loading: false });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   componentDidMount() {
      this.getAuthorData(this.props.authorAuthorID);
   }

   componentDidUpdate(prevProps) {
      if (this.props.authorAuthorID !== prevProps.authorAuthorID) {
         this.getAuthorData(this.props.authorAuthorID);
      }
   }

   render() {
      if (!this.state.author) {
         return (
            <div>(Error: Data could not be retrieved. Please reload page.)</div>
         );
      } else if (this.state.author) {
         const { firstName, lastName, bio } = this.state.author;
         if (this.props.data === 'name') {
            return (
               <div>
                  <Skeleton loading={this.state.loading}>
                     {firstName} {lastName}
                  </Skeleton>
               </div>
            );
         } else if (this.props.data === 'bio') {
            return (
               <div>
                  <Skeleton loading={this.state.loading}>{bio}</Skeleton>
               </div>
            );
         } else if (this.props.data === 'link') {
            return (
               <div>
                  <Skeleton loading={this.state.loading}>
                     <h4>
                        By:{' '}
                        <Link
                           to={`/authorlisting/${this.props.authorAuthorID}`}
                        >
                           {firstName} {lastName}
                        </Link>
                     </h4>
                  </Skeleton>
               </div>
            );
         }
      }
   }
}

export default AuthorInfo;
