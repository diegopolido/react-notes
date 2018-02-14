import React, { Component } from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
	constructor(props) {
		super(props)
		const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
		this.state = {
			notes: notes
		}
		this.add = this.add.bind(this)
		this.eachNote = this.eachNote.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.getNewStyle = this.getNewStyle.bind(this)
	}

	add(text, style) {
		this.setState(prevState => ({
			notes: [
				...prevState.notes,
				{
					id: this.nextId(),
					note: text,
					style: style
				}
			]
		}))
	}

	nextId() {
		this.uniqueId = localStorage.getItem("uniqueId") ? parseInt(localStorage.getItem("uniqueId")) : 0
		this.uniqueId++
		localStorage.setItem("uniqueId", this.uniqueId)
		return this.uniqueId
	}

	update(newText, i) {
		console.log('updating item at index', i, newText)
		this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id !== i) ? note : {...note, note: newText}
			)
		}))
	}

	remove(id) {
		console.log('removing item at', id)
		this.setState(prevState => ({
			notes: prevState.notes.filter(note => note.id !== id)
		}))
	}

	eachNote(note, i) {
		return (
			<Note key={note.id}
					index={note.id}
					style={note.style}
				  onChange={this.update}
				  onRemove={this.remove}>
				  {note.note}
		    </Note>
		)
	}

	getNewStyle() {
		return {
			right: this.randomBetween(0, window.innerWidth - 150, 'px'),
			top: this.randomBetween(0, window.innerHeight - 150, 'px'),
			transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}

	randomBetween(x, y, s) {
		return x + Math.ceil(Math.random() * (y-x)) + s
	}

	render() {
		localStorage.setItem("notes", JSON.stringify(this.state.notes))
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={this.add.bind(null, "New Note", this.getNewStyle())}
						id="add">
					<FaPlus />
				</button>
			</div>
		)
	}
}

export default Board