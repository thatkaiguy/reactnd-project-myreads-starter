import React, { Component } from 'react';
import BookShelf from './Bookshelf'

class ListBooks extends Component {
  currentlyReadingBooks() {
    return this.allBooks().filter((book) => book.shelf === "currentlyReading")
  }

  wantToReadBooks() {
    return this.allBooks().filter((book) => book.shelf === "wantToRead")
  }

  readBooks() {
    return this.allBooks().filter((book) => book.shelf === "read")
  }

  allBooks() {
    return this.props.books
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <BookShelf
          title={"Currently Reading"}
          books={this.currentlyReadingBooks()}
          onBookshelfChange={this.props.onBookshelfChange}
        />
        <BookShelf
          title={"Want to Read"}
          books={this.wantToReadBooks()}
          onBookshelfChange={this.props.onBookshelfChange}
        />
        <BookShelf
          title={"Read"}
          books={this.readBooks()}
          onBookshelfChange={this.props.onBookshelfChange}
        />
      </div>
    )
  }
}

export default ListBooks