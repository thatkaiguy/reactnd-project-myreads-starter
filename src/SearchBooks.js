import React, { Component } from 'react'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.props.onQueryChange(query)
  }

  render() {
    const { books } = this.props
    const { query } = this.state
    return (
      <div className="search-books">
       <div className="search-books-bar">
         <a className="close-search" onClick={() => {this.props.history.push('/')}}>Close</a>
         <div className="search-books-input-wrapper">
           <input
            type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
         </div>
       </div>
       <div className="search-books-results">
         <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book onBookshelfChange={this.props.onBookshelfChange} {...book} />
            </li>
          ))}
         </ol>
       </div>
     </div>
    )
  }
}

export default SearchBooks