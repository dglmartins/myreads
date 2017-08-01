import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
* @description ListOfBooks stateless functional component.Calls Book components for every Book in the list. ListOfBooks gets called by BookShelf and Search components.
* @returns an <ol> with the all the books in list, by mapping through an array of books.
* @param {object} props - Two props from parents: {array} props.booksArray - a list of book objects to map over, with each book passed as a prop to Book component; {function} props.onUpdateBookShelf - function that updates the book shelf passed to Book component.
*/

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

/*propTypes check*/
ListOfBooks.propTypes = {
  booksArray: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default ListOfBooks;
