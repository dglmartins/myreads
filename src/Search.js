import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListOfBooks from './ListOfBooks';
import * as BooksAPI from './BooksAPI';
import R from 'ramda';

class Search extends Component {

  state = {
    query: '',
    myBooksArray: [],
    searchBooksArray: []
  }

  getAndUpdateMyBooksArray() {
    BooksAPI.getAll().then((myBooksArray) => {
      this.setState({ myBooksArray });
    });
  };

  componentDidMount() {
    this.getAndUpdateMyBooksArray();
  }

  assignProperShelfToSearchResults = () => {
    const { myBooksArray, searchBooksArray } = this.state;

    const properShelfStatus = (searchBook) => {
      const searchBooksInMyBooks = myBooksArray.filter((myBook) => myBook.id === searchBook.id);
      return searchBooksInMyBooks[0] ?  {shelf: searchBooksInMyBooks[0].shelf} : {shelf: 'none'};
    }

    const properShelfStatusArray = R.map(properShelfStatus, searchBooksArray);

    const resetShelfSearchBooks = searchBooksArray.map((book, index) => R.merge(book, properShelfStatusArray[index]));

    this.setState({ searchBooksArray: resetShelfSearchBooks});
  };

  updateQuery = (query) => {
    this.setState({ query: query });
    BooksAPI.search(query, 20).then((searchBooksArray) => {
      Array.isArray(searchBooksArray) ? this.setState({ searchBooksArray }) : this.setState({ searchBooksArray: [] });
      this.assignProperShelfToSearchResults();
    });
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAndUpdateMyBooksArray();
      this.updateQuery(this.state.query);
    })
  };


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListOfBooks
            booksArray={this.state.searchBooksArray}
            onUpdateBookShelf={this.updateBookShelf}/>
        </div>
      </div>
    );
  }
}

export default Search;
