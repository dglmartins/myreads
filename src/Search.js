import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListOfBooks from './ListOfBooks';
import * as BooksAPI from './BooksAPI';

/**
* @description Search component. Passes a list of search books from state, and an updateBookShelf method to ListOfBooks component call as props. Search gets called by App component in Route '/search'.
* @returns a <div> with a react-router <Link> to '/', an input for search, and a ListOfBooks component with the correct shelf for each book, which updates every time a shelf is changed.
*/

class Search extends Component {

  // Has a state with a query string, an array of my books and an array of search books.
  state = {
    query: '',
    myBooksArray: [],
    searchBooksArray: []
  }

  /**
  * @description - gets my books from server with API call then sets state of myBooksArray when componentDidMount().
  */
  componentDidMount() {
    BooksAPI.getAll().then((myBooksArray) => {
      this.setState({ myBooksArray });
    });
  }

  /**
  * @description - Assigns proper shelves to search result then sets state. Called when updateQuery() so search results are updated every time query changes.
  */

  assignProperShelfToSearchResults = () => {
    const searchBooksArray = this.state.searchBooksArray.map((searchBook) => {
      const myBook = this.state.myBooksArray.filter((myBook) => myBook.id === searchBook.id)[0];
      myBook ? searchBook.shelf = myBook.shelf : searchBook.shelf = 'none';
      return searchBook;
    });
    this.setState({ searchBooksArray });
  }

  /**
  * @description - Updates query state, gets search results from server with BooksAPi. Checks if response is an array (because empty response is not an array), sets state of searchBooksArray to either search results or empty array (if empty search results). Finally assignProperShelfToSearchResults() to update to correct shelf. Called onChange of search input.
  */
  updateQuery = (query) => {
    this.setState({ query: query });
    BooksAPI.search(query, 20).then((searchBooksArray) => {
      Array.isArray(searchBooksArray) ? this.setState({ searchBooksArray }) : this.setState({ searchBooksArray: [] });
      this.assignProperShelfToSearchResults();
    });
  };

  /**
  * @description - updates shelf of that book in state right away to avoid lag. then updates shelf of a book in the server with API call. Passed to child component, finally called onChange in ShelfChanger component.
  */
  updateBookShelf = (book, shelf) => {
    const searchBooksArray = this.state.searchBooksArray.map((searchBook) => {
      if (searchBook.id === book.id) {
        searchBook.shelf = shelf;
      }
      return searchBook;
    });
    this.setState({searchBooksArray});
    BooksAPI.update(book, shelf);
  };

  /**
  * @returns -  Render method returns a <div> with a react-router <Link> to '/', a search field input that calls updateQuery and with a ListOfBooks call passing state.searchBooksArray and updateBookShelf function as props.
  */
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
