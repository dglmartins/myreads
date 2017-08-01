import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListOfBooks from './ListOfBooks';
import * as BooksAPI from './BooksAPI';
import R from 'ramda';

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
  * @description - gets my books from server with API call then sets state of myBooksArray. Called when componentDidMount() and when updateBookShelf().
  */
  getAndUpdateMyBooksArray() {
    BooksAPI.getAll().then((myBooksArray) => {
      this.setState({ myBooksArray });
    });
  }

  /**
  * @description - calls getAndUpdateMyBooksArray() when componentDidMount.
  */
  componentDidMount() {
    this.getAndUpdateMyBooksArray();
  }

  /**
  * @description - Assigns proper shelves to search result then set state. Uses Ramda for merging and mapping (so I could try out Ramda!). Called when updateQuery().
  */
  assignProperShelfToSearchResults = () => {
    //Deconstructs into two consts
    const { myBooksArray, searchBooksArray } = this.state;

    //@function - Takes a book in search, checks if it is in my Books with filter,returns the correct shelf object ({shelf: shelf} or {shelf: 'none'})
    const properShelfStatus = (searchBook) => {
      const searchBooksInMyBooks = myBooksArray.filter((myBook) => myBook.id === searchBook.id);
      return searchBooksInMyBooks[0] ?  {shelf: searchBooksInMyBooks[0].shelf} : {shelf: 'none'};
    };

    //maps search books array with the properShelfStatus function above, returns an array with proper shelf objects
    const properShelfStatusArray = R.map(properShelfStatus, searchBooksArray);

    //maps over search books array, merges proper shelf with each book (this returns a new book object in each array position with the correct shelf.
    const resetShelfSearchBooks = searchBooksArray.map((book, index) => R.merge(book, properShelfStatusArray[index]));

    //sets state of searchBooksArray with array of books with correct shelf.
    this.setState({ searchBooksArray: resetShelfSearchBooks});
  };

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
  * @description - Updates shelf of a book in the server with API call then resets the state by calling getAndUpdateMyBooksArray() and updateQuery(). Passed to child component, finally called onChange in ShelfChanger component.
  */
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAndUpdateMyBooksArray();
      this.updateQuery(this.state.query);
    })
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
