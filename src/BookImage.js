import React from 'react';
import PropTypes from 'prop-types';

/**
* @description BookImage stateless functional component. BookImage gets called by Book Component.
* @returns a <div> with image of Book if one exists or with a blank image if  it does not.
* @param {object} props - One prop passed from parent: {object} props.book - current book object
*/

const BookImage = (props) => {
  let image = props.book.imageLinks ? props.book.imageLinks.thumbnail : '';
  return (
  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url(${image})` }}>
  </div>
  );
};

/*propTypes check*/
BookImage.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookImage;
