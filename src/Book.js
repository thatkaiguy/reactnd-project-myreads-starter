import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  render() {
    const { id, shelf, imageLinks, title, authors, onBookshelfChange } = this.props
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail || imageLinks.thumbnail})`}}></div>
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