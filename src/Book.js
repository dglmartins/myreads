import React from 'react';

const Book = (props) => {
  let image = props.book.imageLinks ? props.book.imageLinks.thumbnail : '';
  return (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url(${image})` }}>
      </div>
      <div className="book-shelf-changer">
        <select value={props.book.shelf}>
          <option value="disabled" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}
    </div>
    <div className="book-authors">{props.book.author}
    </div>
  </div>
)
};

export default Book;
