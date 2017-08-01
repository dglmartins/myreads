import React from 'react';
import ShelfChanger from './ShelfChanger';
import BookImage from './BookImage';
import BookAuthors from './BookAuthors';
import PropTypes from 'prop-types';

/**
* @description Book stateless functional component. Calls BookImage, ShelfChanger, and BookAuthors components. Book gets called by ListOfBooks component.
* @returns a <div> with the all the Book info.
* @param {object} props - Two props from parent: {object} props.book - current book object passed to BookImage, ShelfChanger and BookAuthors components; {function} props.onUpdateBookShelf - function that updates the book shelf passed to ShelfChanger component.
*/

const Book = (props) => {
  return (
  <div className="book">
    <div className="book-top">
      <BookImage book={props.book}/>
      <ShelfChanger
        book={props.book}
        onUpdateBookShelf={props.onUpdateBookShelf}/>
    </div>
    <div className="book-title">{props.book.title}
    </div>
    <BookAuthors book={props.book}/>
  </div>
  );
};

/*propTypes check*/
Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default Book;
