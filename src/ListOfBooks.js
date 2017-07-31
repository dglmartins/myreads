import React from 'react';
import Book from './Book';

const List = (children) => (
    <ol className="books-grid">
      {children}
    </ol>
);

const ListItem = (book) => (
  <li key={book.id}>
    <Book book={book}/>
  </li>
);

const ListOfBooks = (props) => (
  List(props.booksArray.map(ListItem))
);

export default ListOfBooks;
