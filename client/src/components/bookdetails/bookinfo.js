import React, {Component} from 'react';

class BookInfo extends Component {
  constructor() {
    super()
    this.state = {
      allBooks: []
    }
  }

  componentDidMount() {
    fetch('/api/books')
      .then(res => res.json)
      .then(allBooks => this.setState({allBooks}, () => console.log(allBooks)))
  }

  render () {
    return (
      <div>
        <h1>Books</h1>
      </div>
    );
  }
}
 
export default BookInfo;

