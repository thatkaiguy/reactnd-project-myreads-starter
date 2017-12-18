import React, { Component } from 'react'

class BookshelfChanger extends Component {
  handleChange = (e) => {
    e.preventDefault()

    this.props.onChange(
      { id: this.props.bookID },
      e.target.value
    )
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.selectedOption} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookshelfChanger