import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListOfBooks from './ListOfBooks';
import BookShelf from './BookShelf';

class MyBooksList extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksArray) => {
      this.setState({currentlyReading: booksArray.filter(book => book.shelf === 'currentlyReading')});
      this.setState({wantToRead: booksArray.filter(book => book.shelf === 'wantToRead')});
      this.setState({read: booksArray.filter(book => book.shelf === 'read')});
      // this.setState({ booksArray });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading" books={this.state.currentlyReading}/>
            <BookShelf title="Want To Read" books={this.state.wantToRead}/>
            <BookShelf title="Read" books={this.state.read}/>
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
            >Add a book</Link>
        </div>
      </div>
    );
  }

}

export default MyBooksList;
