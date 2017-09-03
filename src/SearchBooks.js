import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
// import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
	state = {
		query: ''	}

	searchBooks = (query) => {
		//search BooksAPI for new books to add
		this.setState({ query: query.trim() })
		BooksAPI.search(query.trim(),20)
		.then( (books) => {
		  this.setState({ newBooks: books })
		})
	}
	clearQuery = () => {
	  this.setState({ query: '' })
	}
	render() {
		const { query } = this.state
		const { changeStatus } = this.props
		let { newBooks } = this.state
		// let showingBooks
		// if (query) {
		// 	const match = new RegExp(escapeRegExp(query), 'i')
		// 	// showingBooks = newBooks.filter((book) => match.test(book.title)) //and match by author
		// 	showingBooks = this.searchBooks(query);
		// }
		// else {
		// 	showingBooks = newBooks
		// }
		if (newBooks) {
			newBooks.sort(sortBy('title'))
		}

		return (

			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link
			  		className="close-search" to="/">Close</Link>
			    <div className="search-books-input-wrapper">
			      {/*
			        NOTES: The search from BooksAPI is limited to a particular set of search terms.
			        You can find these search terms here:
			        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			        you don't find a specific author or title. Every search is limited by search terms.
			      */}
			      	<input
			      		type="text"
			      		value={query}
			      		onChange={ (event) => this.searchBooks( event.target.value )}
			      		placeholder="Search by title or author"/>
			    </div>
			  </div>
			  <div className="search-books-results">

			      <ol className="books-grid">
			      	{ newBooks && newBooks.map((book)=> (
					  		<li key={book.id} className="book-list-item">
					  			<Book book={book} changeStatus={changeStatus}/>
					  		</li>
					  	))
			    	}

			      </ol>
			    </div>
			</div>
		)

	}
}
export default SearchBooks