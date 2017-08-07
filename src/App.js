import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => { this.setState( { books }) })
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <ListBooks
            books={this.state.books} />

          )}/>
        <Route exact path="/search" render={ () => (
          <SearchBooks books={this.state.books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp