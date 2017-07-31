import React from 'react';
import ListOfBooks from './ListOfBooks';

const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ListOfBooks booksArray={props.books}/>
    </div>
  </div>
);

export default BookShelf;
