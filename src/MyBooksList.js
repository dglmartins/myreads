import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

/**
* @description MyBooksList component. Has a react-router <Link> to '/search'. Passes title of shelf, a list of books from state, and updateBookShelf method to each BookShelf call as props. MyBooksList gets called by App component in Route '/'.
* @returns a <div> with three shelves each containing books of a list by calling BookShelf component three times.
*/

class MyBooksList extends Component {

  //Has a state with arrays of my books.
  state = {
    myBooks: []
  }

  /**
  * @description - gets my books from server with API call then sets state when componentDidMount.
  */
  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
    });
  }

  /**
  * @description - updates shelf of a book in state right away to avoid lag, then updates shelf of a book in the server with API call. Passed to child component, finally called onChange in ShelfChanger component.
  */

  updateBookShelf = (book, shelf) => {
    const myBooks = this.state.myBooks.map((myBook) => {
      if (myBook.id === book.id) {
        myBook.shelf = shelf;
      }
      return myBook;
    });
    this.setState({myBooks});
    BooksAPI.update(book, shelf);
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
              title="Currently Reading" books={this.state.myBooks.filter(book => book.shelf === 'currentlyReading')}
              onUpdateBookShelf={this.updateBookShelf}/>
            <BookShelf
              title="Want To Read" books={this.state.myBooks.filter(book => book.shelf === 'wantToRead')}
              onUpdateBookShelf={this.updateBookShelf}/>
            <BookShelf
              title="Read"
              books={this.state.myBooks.filter(book => book.shelf === 'read')}
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
