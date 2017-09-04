import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
  }
  updateBookShelf = (book, shelf) =>{
    //update state and BooksAPI
    let myLibraryBooks = this.state.books
    BooksAPI.update(book, shelf).then((shelves) => {
      //find the book being modified in my library if it exists
      let modifiedBook = myLibraryBooks.find((aBook)=> {
            return aBook.id === book.id
           })
      if (!modifiedBook){
        // if book isn't in my library already append with the new shelf
        book.shelf = shelf
        myLibraryBooks.push(book)
      } else {
       //Update modifiedBook so that the book in question has its shelf updated.
        modifiedBook.shelf = shelf
      }
      //update state of myLibraryBooks
      this.setState( (state) => ({
        books: myLibraryBooks
        })
      )

    }).catch((error) => {
      //catch any errors in console
      console.error(error)
    })
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState( { books })
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <BookShelf
            books={this.state.books} changeStatus={this.updateBookShelf}/>

          )}/>
        <Route exact path="/search" render={ () => (
          <SearchBooks changeStatus={this.updateBookShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp