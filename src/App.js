import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import MyBooksList from './MyBooksList';
import NoMatch from './NoMatch';
import shortid from 'shortid';

/**
* @description App component. Uses Switch to navigate to 404 if wrong path. Uses Route to call Search and MyBooksList components depending on path. App gets called in index.js to display App in root div. Passes a list of books from state, and updateBookShelf method to Search and MyBookList. Also passes  each onUpdateQuery and query to Search.
*/

class App extends Component {

  //Has a state with 3 arrays of my books in shelves.
  state = {
    myBooks: [],
    searchBooksArray: [],
    query: ''
  }

  /**
  * @description - gets my books from server with API call, adds shortid for unique keys then sets state when componentDidMount.
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const myBooks = books.map((book) => Object.assign(book, {_id: shortid.generate()}))
      this.setState({ myBooks });
    });
  }

  /**
  * @description - updates shelf of a book in state right away to avoid lag, then updates shelf of a book in the server with API call. Passed to children components, finally called onChange in ShelfChanger component.
  */
  updateBookShelf = (bookToUpdate, shelf) => {
    const newBook = Object.assign(bookToUpdate, { shelf: shelf });
    const myBooksFiltered = this.state.myBooks.filter((myBook) => myBook.id !== bookToUpdate.id)
    const booksFilteredWithNewBook = myBooksFiltered.concat(newBook);
    const newCurrentlyReading = booksFilteredWithNewBook.filter((myBook) => myBook.shelf === 'currentlyReading');
    const newWantToRead = booksFilteredWithNewBook.filter((myBook) => myBook.shelf === 'wantToRead');
    const newRead = booksFilteredWithNewBook.filter((myBook) => myBook.shelf === 'read');
    const myBooks = newCurrentlyReading.concat(newWantToRead).concat(newRead);
    const searchBooksArray = this.state.searchBooksArray.map((book) => {
      if (book.id === bookToUpdate.id) {
        book.shelf = shelf;
      }
      return book;
    });
    this.setState({myBooks, searchBooksArray});
    BooksAPI.update(bookToUpdate, shelf);
  };

  /**
  * @description - Updates query state, gets search results from server with BooksAPi. Checks if response is an array (because empty response is not an array). If is array, adds unique shortid, and sets state of searchBooksArray. If response is not array, sets sets search results state to empty array. Finally assignProperShelfToSearchResults() to update to correct shelf. Called onChange of search input.
  */
  updateQuery = (query) => {
    this.setState({ query: query });
    BooksAPI.search(query, 20).then((books) => {
      if (Array.isArray(books)) {
        const searchBooksArray = books.map((book) => Object.assign(book, {_id: shortid.generate()}));
        this.setState({ searchBooksArray })
      } else {
        this.setState({ searchBooksArray: [] });
      }
      this.assignProperShelfToSearchResults();
    });
  };

  /**
  * @description - Assigns proper shelves to search result then sets state. Called when updateQuery() so search results are updated every time query changes.
  */
  assignProperShelfToSearchResults = () => {
    const searchBooksArray = this.state.searchBooksArray.map((searchBook) => {
      const myBook = this.state.myBooks.filter((myBook) => myBook.id === searchBook.id)[0];
      myBook ? searchBook.shelf = myBook.shelf : searchBook.shelf = 'none';
      return searchBook;
    });
    this.setState({ searchBooksArray });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/search" render={() => (
            <Search searchBooksArray={this.state.searchBooksArray} onUpdateQuery={this.updateQuery} onUpdateBookShelf={this.updateBookShelf} query={this.state.query}/>
          )}/>
          <Route exact path="/" render={() => (
            <MyBooksList myBooks={this.state.myBooks} onUpdateBookShelf={this.updateBookShelf}/>
          )}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
