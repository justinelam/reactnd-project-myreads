import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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
		const { books } = this.props
		let showingBooks
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = books.filter((book) => match.test(book.name))
		} else {
			showingBooks = books
		}

		showingBooks.sort(sortBy('name'))
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
			    <ol className="books-grid">

			    </ol>
			  </div>
			</div>
		)

	}
}
export default SearchBooks