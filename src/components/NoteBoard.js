import React from 'react';
import PostItNote from './PostItNote';
import SwimLanes from './SwimLanes';

const defaultNotes = [
	{
		text: 'Remember to finish that disney thing'
	}, {
		text: 'Milk'
	}
];

export default class NoteBoard extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notes: defaultNotes,
			createText: '',
			selectedNote: null,
			showSwimLanes: false
		};

		this.addNote = this.addNote.bind(this);
		this.alterInputText = this.alterInputText.bind(this);
		this.toggleSwimLane = this.toggleSwimLane.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
	}

	addNote() {
		const tempNewNotes = this.state.notes.slice(0);
		tempNewNotes.push({text: this.state.createText});
		this.setState({notes: tempNewNotes})
	}

	alterInputText(e) {
		console.log('yup altering', e.target.value);
		this.setState({createText: e.target.value})
	}
	submitCreateNote(e) {
		e.preventDefault();
	}

	selectNote(noteIndex) {
		console.log('hallo')
		if (this.state.selectedNote === noteIndex) {
			this.setState({selectedNote: null})
		}
		else {
			this.setState({selectedNote: noteIndex})
		}
	}

	deleteNote(noteIndex) {
		const tempNotes = this.state.notes.slice(0);
		tempNotes.splice(noteIndex, 1);
		this.setState({
			notes: tempNotes
		})
	}

	toggleSwimLane(e) {
		e.preventDefault();
		this.setState({
			showSwimLanes: !this.state.showSwimLanes
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitCreateNote}>
					<input className="create-input" onChange={this.alterInputText}/>

					<button className="create-button" onClick={this.addNote}>Add note</button>
					<button className="toggle-swim-button" onClick={this.toggleSwimLane}>Toggle swim lane display</button>

				</form>

				{this.state.showSwimLanes && <SwimLanes />}

				{this.state.notes.map(
					(note, noteIndex) => {
						return <PostItNote
							initialY={80}
							initialX={10}
							deleteNote={() => this.deleteNote(noteIndex)}
							clickNote={() => this.selectNote(noteIndex)}
							isSelected={noteIndex === this.state.selectedNote}
							key={noteIndex}
							text={note.text}/>
					})
				}
			</div>
		)
	}
}
