import React from 'react';
import Book from './Book';

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

export default ListOfBooks;
