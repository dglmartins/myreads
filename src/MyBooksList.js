import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

/**
* @description MyBooksList stateless functional component. Has a react-router <Link> to '/search'. Passes title of shelf, a list of books, and updateBookShelf method to each BookShelf call as props. MyBooksList gets called by App component in Route '/'.
* @returns a <div> with three shelves each containing books of a list by calling BookShelf component three times.
* @param {object} props - Two props from parents: {array} props.myBooks - a list of my books to be filtered and passed to each BookShelf; {function} props.onUpdateBookShelf - function that updates the book shelf passed to each BookShelf component.
*/

const MyBooksList = (props) =>  (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf
          title="Currently Reading" booksArray={props.myBooks.filter((myBook) => myBook.shelf === 'currentlyReading')}
          onUpdateBookShelf={props.onUpdateBookShelf}/>
        <BookShelf
          title="Want To Read" booksArray={props.myBooks.filter((myBook) => myBook.shelf === 'wantToRead')}
          onUpdateBookShelf={props.onUpdateBookShelf}/>
        <BookShelf
          title="Read"
          booksArray={props.myBooks.filter((myBook) => myBook.shelf === 'read')}
          onUpdateBookShelf={props.onUpdateBookShelf}/>
      </div>
    </div>
    <div className="open-search">
      <Link
        to="/search"
        >Add a book</Link>
    </div>
  </div>
);

/*propTypes check*/
MyBooksList.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};


export default MyBooksList;
