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
    let currentBooks = this.state.books
    BooksAPI.update(book, shelf).then((shelves) => {
      //TODO: Check if there was no error (how do I do that?)
      let index
      let booksOnShelf = shelves[shelf]  //array of book id's in shelf being updated
      //TODO: Refactor this code, there must be a better way of finding the index of the book
      for ( let bookID of booksOnShelf) {
        for ( let i of currentBooks){
          //find the book based on matching id's
          if (i.id === bookID) {
          //get current index of book in App props
           index = currentBooks.findIndex((elem)=> {
            return elem.id === bookID
           })
            break
          }
        }
      }
      //Update state so that the book in question has its shelf updated.
      currentBooks[index].shelf = shelf
      this.setState( (state) => ({
        books: currentBooks
        })
      )
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