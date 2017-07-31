import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListOfBooks from './ListOfBooks';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

  state = {
    query: '',
    booksArray: []
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    BooksAPI.search(query, 20).then((booksArray) => {
      Array.isArray(booksArray) ? this.setState({ booksArray }) : this.setState({ booksArray: [] });
    });
  }


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
          <ListOfBooks booksArray={ this.state.booksArray}/>
        </div>
      </div>
    );
  }
}

export default Search;
