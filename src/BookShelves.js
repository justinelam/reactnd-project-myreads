import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookShelves extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		changeStatus: PropTypes.func.isRequired,
		getBookShelf: PropTypes.func.isRequired
	};
	render() {
		const { books, changeStatus, getBookShelf } = this.props
		const shelves = [
		{
		  id: 'currentlyReading',
		  title: 'Currently Reading',
		 books: books.filter(book => book.shelf === 'currentlyReading')
		},
		{
		  id: 'wantToRead',
		  title: 'Want to Read',
		 books: books.filter(book => book.shelf === 'wantToRead')
		},
		{
		  id: 'read',
		  title: 'Read',
		 books: books.filter(book => book.shelf === 'read')
		},
		]
		return(
			<div className="list-books">
			  <div className="list-books-title">
			    <h1>MyReads</h1>
			  </div>
			  <div className="list-books-content">
			    <div>
			    	{shelves.map( (shelf) => (
					 <BookShelf key={shelf.id} title={shelf.title} books={shelf.books} changeStatus={changeStatus} getBookShelf={getBookShelf}/>
					))}
			    </div>
			  </div>
			  <div className="open-search">
			    <Link to="/search">Add a book</Link>
			  </div>
			</div>
		)
	}
}
export default BookShelves