import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

class SearchBooks extends React.Component {
	state = {
		query: ''
	}
	clearQuery = () => {
	  this.setState({ query: '' })
	}
	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}
	render() {
		const { query } = this.state
		const { books, changeStatus } = this.props
		let showingBooks
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = books.filter((book) => match.test(book.title))
		} else {
			showingBooks = books
		}
		showingBooks.sort(sortBy('title'))
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
			      		onChange={ (event) => this.updateQuery( event.target.value )}
			      		placeholder="Search by title or author"/>
			    </div>
			  </div>
			  <div className="search-books-results">
			  	{showingBooks.length !== books.length && (
			  		<div className='showing-books'>
			              <span>Now showing {showingBooks.length} of {books.length} total</span>

			          </div>
			  		)}
			    <ol className="books-grid">
			    	{showingBooks.map((book)=> (
			    		<li key={book.id} className="book-list-item">
			    			<Book book={book} changeStatus={changeStatus.bind(this)}/>
			    		</li>
			    	))}

			    </ol>
			  </div>
			</div>
		)

	}
}
export default SearchBooks