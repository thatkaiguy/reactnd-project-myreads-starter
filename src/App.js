import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

    // a book
    // {
    //   "title": "The Linux Command Line",
    //   "subtitle": "A Complete Introduction",
    //   "authors": [
    //     "William E. Shotts, Jr."
    //   ],
    //   "publisher": "No Starch Press",
    //   "publishedDate": "2012",
    //   "description": "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\"",
    //   "industryIdentifiers": [
    //     {
    //       "type": "ISBN_13",
    //       "identifier": "9781593273897"
    //     },
    //     {
    //       "type": "ISBN_10",
    //       "identifier": "1593273894"
    //     }
    //   ],
    //   "readingModes": {
    //     "text": true,
    //     "image": false
    //   },
    //   "pageCount": 480,
    //   "printType": "BOOK",
    //   "categories": [
    //     "COMPUTERS"
    //   ],
    //   "averageRating": 4,
    //   "ratingsCount": 2,
    //   "maturityRating": "NOT_MATURE",
    //   "allowAnonLogging": true,
    //   "contentVersion": "1.2.2.0.preview.2",
    //   "panelizationSummary": {
    //     "containsEpubBubbles": false,
    //     "containsImageBubbles": false
    //   },
    //   "imageLinks": {
    //     "smallThumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    //     "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    //   },
    //   "language": "en",
    //   "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
    //   "infoLink": "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api",
    //   "canonicalVolumeLink": "https://market.android.com/details?id=book-nggnmAEACAAJ",
    //   "id": "nggnmAEACAAJ",
    //   "shelf": "currentlyReading"
    // }
  }

  // updateBook(book, shelf) {
  //   BooksAPI.update(book, shelf).then(book => {
  //     this.setState((state) => ({
  //       books: state.books.map(prevBook => {
  //         if (prevBook.id === book.id) {
  //           prevBook.shelf = shelf
  //         }
  //         return prevBook
  //       })
  //     })) // setState
  //   })
  // }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.setState((state) => ({
        books: state.books.map(prevBook => {
                  if (prevBook.id === book.id) { prevBook.shelf = shelf }
                  return prevBook
                })
      })) // setState
    })
  }

  render() {
    const { books } = this.state
    return (
      <ListBooks
        books={books}
        onBookshelfChange={(book, shelf) => {
          this.updateBook(book, shelf)
        }}
      />
    )
    // return (
    //   <div className="app">
    //     {this.state.showSearchPage ? (
    //       <div className="search-books">
    //         <div className="search-books-bar">
    //           <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
    //           <div className="search-books-input-wrapper">
    //             {/*
    //               NOTES: The search from BooksAPI is limited to a particular set of search terms.
    //               You can find these search terms here:
    //               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    //               However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    //               you don't find a specific author or title. Every search is limited by search terms.
    //             */}
    //             <input type="text" placeholder="Search by title or author"/>

    //           </div>
    //         </div>
    //         <div className="search-books-results">
    //           <ol className="books-grid"></ol>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="list-books">
    //         <div className="list-books-title">
    //           <h1>MyReads</h1>
    //         </div>
    //         <div className="list-books-content">
    //           <div>
    //             <div className="bookshelf">
    //               <h2 className="bookshelf-title">Currently Reading</h2>
    //               <div className="bookshelf-books">
    //                 <ol className="books-grid">
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">To Kill a Mockingbird</div>
    //                       <div className="book-authors">Harper Lee</div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">Ender's Game</div>
    //                       <div className="book-authors">Orson Scott Card</div>
    //                     </div>
    //                   </li>
    //                 </ol>
    //               </div>
    //             </div>
    //             <div className="bookshelf">
    //               <h2 className="bookshelf-title">Want to Read</h2>
    //               <div className="bookshelf-books">
    //                 <ol className="books-grid">
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">1776</div>
    //                       <div className="book-authors">David McCullough</div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">Harry Potter and the Sorcerer's Stone</div>
    //                       <div className="book-authors">J.K. Rowling</div>
    //                     </div>
    //                   </li>
    //                 </ol>
    //               </div>
    //             </div>
    //             <div className="bookshelf">
    //               <h2 className="bookshelf-title">Read</h2>
    //               <div className="bookshelf-books">
    //                 <ol className="books-grid">
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">The Hobbit</div>
    //                       <div className="book-authors">J.R.R. Tolkien</div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">Oh, the Places You'll Go!</div>
    //                       <div className="book-authors">Seuss</div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="book">
    //                       <div className="book-top">
    //                         <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
    //                         <div className="book-shelf-changer">
    //                           <select>
    //                             <option value="none" disabled>Move to...</option>
    //                             <option value="currentlyReading">Currently Reading</option>
    //                             <option value="wantToRead">Want to Read</option>
    //                             <option value="read">Read</option>
    //                             <option value="none">None</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                       <div className="book-title">The Adventures of Tom Sawyer</div>
    //                       <div className="book-authors">Mark Twain</div>
    //                     </div>
    //                   </li>
    //                 </ol>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="open-search">
    //           <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // )
  }
}

export default BooksApp
