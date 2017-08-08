import React, { Component } from 'react';
import './App.css'
import PropTypes from 'prop-types';


class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		changeStatus: PropTypes.func.isRequired
	};
	state = {
		value: this.props.book.shelf
	}
	render() {
		const { book, changeStatus } = this.props
		// let shelf = book.shelf
		return(
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
			    <div className="book-shelf-changer">
			      <select value={this.state.value} onChange={(e)=>changeStatus(book, e.target.value)}>
			        <option value="none" disabled>Move to...</option>
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