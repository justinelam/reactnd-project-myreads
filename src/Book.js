import React, { Component } from 'react';
import './App.css'
import PropTypes from 'prop-types';


class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		changeStatus: PropTypes.func.isRequired,
		getBookShelf: PropTypes.func.isRequired
	};
	state = {
		shelf: 'none'
	}
	componentDidMount() {
		const { book, getBookShelf } = this.props
		let shelf = getBookShelf(book.id)
	  	if (shelf === undefined || shelf === "none") {
			this.setState({ shelf: "none"})
		} else {
			this.setState({ shelf: shelf})
		}
	}
	render() {
		const { book, changeStatus, getBookShelf } = this.props
		let shelf = getBookShelf(book.id)
		return(
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
			    <div className="book-shelf-changer">
			      <select value={shelf} onChange={(e)=>changeStatus(book, e.target.value)}>
			        <option value="" disabled>Move to...</option>
			        <option value="currentlyReading">Currently Reading</option>
			        <option value="wantToRead">Want to Read</option>
			        <option value="read">Read</option>
			        <option value="none">None</option>
			      </select>
			    </div>
			  </div>
			  <div className="book-title">{book.title}</div>
			  <div className="book-authors">{book.authors}</div>
			</div>
		)
	}
}
export default Book