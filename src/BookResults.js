import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookResults extends React.Component {
	render(){
		const { changeStatus, getBookShelf, newBooks } = this.props
		return (
			  <div className="search-books-results">

		      <ol className="books-grid">
		      	{ newBooks && newBooks.map((book)=> (
				  		<li key={book.id} className="book-list-item">
				  			<Book book={book} changeStatus={changeStatus} getBookShelf={getBookShelf}/>
				  		</li>
				  	))
		    	}

		      </ol>
		    </div>

			)
	}


}
export default BookResults