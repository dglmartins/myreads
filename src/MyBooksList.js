import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

/**
* @description MyBooksList component. Has a react-router <Link> to '/search'. Passes title of shelf, a list of books from state, and updateBookShelf method to each BookShelf call as props. MyBooksList gets called by App component in Route '/'.
* @returns a <div> with three shelves each containing books of a list by calling BookShelf component three times.
*/

class MyBooksList extends Component {

  //Has a state with 3 arrays of books, currentlyReading, wantToRead and read.
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  /**
  * @description - gets my books from server with API call then sets state of each array using .filter. Called when componentDidMount().
  */
  getAndUpdateState() {
    BooksAPI.getAll().then((booksArray) => {
      this.setState({currentlyReading: booksArray.filter(book => book.shelf === 'currentlyReading')});
      this.setState({wantToRead: booksArray.filter(book => book.shelf === 'wantToRead')});
      this.setState({read: booksArray.filter(book => book.shelf === 'read')});
    });
  };

  /**
  * @description - Calls getAndUpdateState() when componentDidMount.
  */
  componentDidMount() {
    this.getAndUpdateState();
  }

  /**
  * @description - Updates shelf of a book in the server with API call then resets the state by calling getAndUpdateState(). Passed to children components, finally called onChange in ShelfChanger component.
  */

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAndUpdateState();
    })
  };

  /**
  * @returns - a <div> with 3 BookShelf calls, and a react-router <Link> to '/search'.
  */
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading" books={this.state.currentlyReading}
              onUpdateBookShelf={this.updateBookShelf}/>
            <BookShelf
              title="Want To Read" books={this.state.wantToRead}
              onUpdateBookShelf={this.updateBookShelf}/>
            <BookShelf
              title="Read"
              books={this.state.read}
              onUpdateBookShelf={this.updateBookShelf}/>
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
