import React from 'react';

const ShelfChanger = (props) => (
  <div className="book-shelf-changer">
    <select
      value={props.book.shelf}
      onChange={(event) => props.onUpdateBookShelf(props.book, event.target.value)}>
      <option value="disabled" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

const BookImage = (props) => {
  let image = props.book.imageLinks ? props.book.imageLinks.thumbnail : '';
  return (
  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url(${image})` }}>
  </div>
  );
};

const BookAuthors = (props) => {
  let authors = props.book.authors ? props.book.authors.join('; ') : 'No author info';
  return (
    <div className="book-authors">{authors}
    </div>
  );
};

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
)
};

export default Book;
