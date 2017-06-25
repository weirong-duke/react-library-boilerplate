import React from 'react';
import PostItNote from './components/PostItNote';

const defaultNotes = [
	{
		text: 'Remember to finish that disney thing'
	},
	{
		text: 'Milk'
	}
];




export default class NoteBoard extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			notes: defaultNotes,
			createText: ''
		};

		this.addNote = this.addNote.bind(this);
		this.alterInputText = this.alterInputText.bind(this);
	}

	addNote() {
		console.log('thisis the text im getting');
		console.log(this.state.createText);
		const tempNewNotes = this.state.notes.slice(0);
		tempNewNotes.push({text: this.state.createText});
		this.setState({
			notes: tempNewNotes
		})
	}

	alterInputText(e) {
		console.log('yup altering', e.target.value);
		this.setState({
			createText: e.target.value
		})
	}

	render() {
		return (
			<div>
				<input className="create-input" onChange={this.alterInputText}/>

				<button className="create-button" onClick={this.addNote}>Add note</button>
				{this.state.notes.map((note, noteIndex) => <PostItNote key={noteIndex} text={note.text}/>)}
			</div>
		)
	}
}
