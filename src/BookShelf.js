import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		title: PropTypes.string.isRequired,
		changeStatus: PropTypes.func.isRequired,
		getBookShelf: PropTypes.func.isRequired
	};
	render() {
		const {title, books, getBookShelf, changeStatus} = this.props
		return(
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{books.map((book)=> (
						<li key={book.id} className="book-list-item">
						<Book book={book} changeStatus={changeStatus} getBookShelf={getBookShelf}/>
						</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}
export default BookShelf