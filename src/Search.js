import React from 'react';
import { Link } from 'react-router-dom';
import ListOfBooks from './ListOfBooks';
import PropTypes from 'prop-types';

/**
* @description Search stateless functional component. Passes a list of search books and an updateBookShelf method to ListOfBooks component call as props. Search gets called by App component in Route '/search'.
* @returns a <div> with a react-router <Link> to '/', an input for search, and a ListOfBooks component.
* @param {object} props - Four props from parents: {array} props.searchBooksArray - a list of search books passed to ListOfBooks component; {function} props.onUpdateBookShelf - function that updates the book shelf passed to ListOfBooks component; {function} props.onUpdateQuery - a function that updates the query state in APP and the shelf of search books when query changes; {string} props.query - the actual query used in the value of the input.
*/

const Search = (props) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link
        to="/"
        className="close-search"
        onClick={() => props.onUpdateQuery('')}
        >Close</Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={props.query}
          onChange={(event) => props.onUpdateQuery(event.target.value)}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ListOfBooks
        booksArray={props.searchBooksArray}
        onUpdateBookShelf={props.onUpdateBookShelf}/>
    </div>
  </div>
);

/*propTypes check*/
Search.propTypes = {
  searchBooksArray: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onUpdateQuery: PropTypes.func.isRequired
};

export default Search;
