import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListOfBooks from './ListOfBooks';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

  state = {
    query: '',
    myBooksArray: [],
    searchBooksArray: []
  }

  getAndUpdateMyBooksArray() {
    BooksAPI.getAll().then((myBooksArray) => {
      this.setState({ myBooksArray });
      // this.setState({ booksArray });
      console.log(this.state);
    });
  };

  componentDidMount() {
    this.getAndUpdateMyBooksArray();
  }

  resetSearchResultsShelf = () => {
    this.state.searchBooksArray.map((searchBook, index) => {
      this.setState((state) => state.searchBooksArray[index].shelf = 'none')
    });
  };

  assignProperShelfToSearchResults = () => {
    const { myBooksArray, searchBooksArray } = this.state;
    myBooksArray.map((myBook) => {
      searchBooksArray.map((searchBook, index) => {
        if (myBook.id === searchBook.id) {
          console.log(myBook.title);
          this.setState((state) => {
            state.searchBooksArray[index].shelf = myBook.shelf;
          });
        }
      })
    })
  };

  updateQuery = (query) => {
    this.getAndUpdateMyBooksArray();
    this.setState({ query: query });

    BooksAPI.search(query, 20).then((searchBooksArray) => {
      Array.isArray(searchBooksArray) ? this.setState({ searchBooksArray }) : this.setState({ searchBooksArray: [] });
      this.resetSearchResultsShelf();
      this.assignProperShelfToSearchResults();
    });
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
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
