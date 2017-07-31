import React, { Component } from 'react';
import SearchResults from './SearchResults';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  state = {
    query: '',
    searchBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    BooksAPI.search(query, 20).then((searchBooks) => {
      Array.isArray(searchBooks) ? this.setState({ searchBooks }) : this.setState({ searchBooks: [] });
    });
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/**
           * TODO: Add onClick to below}.
           */}
          <a className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        {/**
         * TODO: The below can be its own component?.
         */}
         <SearchResults searchBooks={this.state.searchBooks}/>
      </div>
    );
  }
}

export default SearchBooks;
