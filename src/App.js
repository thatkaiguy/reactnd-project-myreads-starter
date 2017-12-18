import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    foundBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.setState((state) => ({
        books: state.books.map(prevBook => {
          if (prevBook.id === book.id) { prevBook.shelf = shelf }
          return prevBook
        }),
        foundBooks: state.foundBooks.map(prevBook => {
          if (prevBook.id === book.id) { prevBook.shelf = shelf }
          return prevBook
        })
      })) // setState
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
