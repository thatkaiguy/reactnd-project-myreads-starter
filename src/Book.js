import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
  }

  render() {
    const { id, shelf, imageLinks, title, authors, onBookshelfChange } = this.props
    let backgroundImageUrl = imageLinks ? `url(${imageLinks.smallThumbnail || imageLinks.thumbnail})` : '#'
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: backgroundImageUrl}}></div>
          <BookshelfChanger
            selectedOption={shelf}
            bookID={id}
            onChange={onBookshelfChange}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors.join(', ') : ''}</div>
      </div>
    )
  }
}

export default Book