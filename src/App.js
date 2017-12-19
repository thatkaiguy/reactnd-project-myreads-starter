import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    foundBooks: []
  }

  componentDidMount() {
    this._fetchShelvedBooks()
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
        this.setState((state) => ({
          foundBooks: state.foundBooks.map(prevBook => {
            if (prevBook.id === book.id) { prevBook.shelf = shelf }
            return prevBook
          })
        }))
      }).then(() => {
        this._fetchShelvedBooks()
      })
  }

  search = (query) => {
    BooksAPI.search(query).then((response) => {
      if (response) {
        this.setState((state) => ({
          foundBooks: response.error ? [] : response
        }))
      }
    })
  }

  _fetchShelvedBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    const { books, foundBooks } = this.state
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onBookshelfChange={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={foundBooks}
            onQueryChange={this.search}
            onBookshelfChange={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
            history={history}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
