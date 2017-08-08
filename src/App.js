import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  updateBookShelf = (book, shelf) =>{
    //update state and to BooksAPI
    let books = this.state.books
    BooksAPI.update(book, shelf)
    BooksAPI.get(book.id)
    .then( (b) => {
      for (const prop in books ){
        const value = books[prop]
        if (value.id === b.id) {
           this.setState( (state) => ({
                 books: state.books.filter( (b) => b.id !== value.id )
               }))
           this.setState(state=>({
             books: state.books.concat([b])
           }))
        }
      }
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
            books={this.state.books} changeStatus={this.updateBookShelf.bind(this)}/>

          )}/>
        <Route exact path="/search" render={ () => (
          <SearchBooks books={this.state.books} changeStatus={this.updateBookShelf.bind(this)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp