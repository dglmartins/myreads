import React from 'react';
import ListOfBooks from './ListOfBooks';
import PropTypes from 'prop-types';

/**
* @description BookShelf stateless functional component. BookShelf gets called by MyBooksList component.
* @returns a <div> with a shelf containing books of a list. Calls ListOfBooks component.
* @param {object} props - Three props from parent: {array} props.booksArray - a list of book objects passed as a prop to ListOfBooks component; {function} props.onUpdateBookShelf - function that updates the book shelf passed to ListOfBooks component; {string} props.title - The title of a shelf.
*/

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

/*propTypes check*/
BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookShelf;
