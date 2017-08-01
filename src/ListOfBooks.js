import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const ListOfBooks = (props) => (
  <ol className="books-grid">
    {props.booksArray.map((book) =>
      <li key={book.id}>
        <Book
          book={book}
          onUpdateBookShelf={props.onUpdateBookShelf}/>
      </li>
    )}
  </ol>
);

ListOfBooks.propTypes = {
  booksArray: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default ListOfBooks;
