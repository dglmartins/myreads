import React from 'react';
import PropTypes from 'prop-types';

/**
* @description BookAuthors stateless functional component. BookAuthors gets called by Book Component.
* @returns a <div> with the joined Array of authors of a book or with the string 'No author info' if there are no authors.
* @param {object} props - One prop passed from parent: {object} props.book - current book object
*/

const BookAuthors = (props) => {
  let authors = props.book.authors ? props.book.authors.join('; ') : 'No author info';
  return (
    <div className="book-authors">{authors}
    </div>
  );
};

/*propTypes check*/
BookAuthors.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookAuthors;
