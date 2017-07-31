import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

  state = {
    query: '',
    searchResultsArray: []
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    BooksAPI.search(query, 20).then((searchResultsArray) => {
      Array.isArray(searchResultsArray) ? this.setState({ searchResultsArray }) : this.setState({ searchResultsArray: [] });
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
         <SearchResults searchResultsArray={ this.state.searchResultsArray}/>
      </div>
    );
  }
}

export default Search;
