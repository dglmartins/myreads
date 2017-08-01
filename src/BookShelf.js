import React from 'react';
import ListOfBooks from './ListOfBooks';
import PropTypes from 'prop-types';

const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ListOfBooks
        booksArray={props.books}
        onUpdateBookShelf={props.onUpdateBookShelf}/>
    </div>
  </div>
);

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookShelf;
