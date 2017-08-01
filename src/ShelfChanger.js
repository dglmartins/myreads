import React from 'react';
import PropTypes from 'prop-types';

/**
* @description ShelfChanger stateless functional component. Returns a <div> with the options list to change a book from one shelf to another OnChange. ShelfChanger gets called by Book Component.
* @param {object} props - Two props passed from parent: {object} props.book - current book object passed from * parent Component; {function} props.onUpdateBookShelf - function that updates the book shelf passed from parent Component
*/

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

/*propTypes check*/
ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default ShelfChanger;
