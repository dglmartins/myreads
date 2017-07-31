import React, { Component } from 'react';
import Book from './Book';

const List = (children) => (
  <div className="search-books-results">
    <ol className="books-grid">
      {children}
    </ol>
  </div>
);

const ListItem = (book) => (
  <li key={book.id}>
    <Book book={book}/>
  </li>
);

const SearchResults = (props) => (
  List(props.searchBooks.map(ListItem))
);

export default SearchResults;
