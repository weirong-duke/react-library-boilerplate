import React from 'react';

const getPostItStyles = (x, y, isSelected, moving) => {
	if (isSelected) {
		return {};
	}
	else {
		//this is the an annoying part that requires explanation
		//the flipping of the note requires a transition, but if you add time to a transition, then the *moving* of a note also shows the x-second delay
		//for example, transition: all 0.5s ease-in-out will delay the user when they drag and drop a post it
		//thus, we need to remove the transition specifically if the user is dragging and dropping
		return moving
			? {
				left: x || 0,
				top: y || 0,
				transition: 'none'
			} : {
				left: x || 0,
				top: y || 0
			};
	}
};

export default class PostItNote extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			x: this.props.initialX || 0,
			y: this.props.initialY || 0,
			delta: {},
			moving: false
		};

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.moveNote = this.moveNote.bind(this);
		this.clickNote = this.clickNote.bind(this);
	}

	componentDidUpdate(nextProps, nextState) {
		//this is necessary to remove janky behavior between the React component updating and
		//the actual element shifting
		if (this.state.moving && !nextState.moving) {
			document.addEventListener('mousemove', this.moveNote);
			document.addEventListener('mouseup', this.onMouseUp);
		} else if (!this.state.moving && nextState.moving) {
			document.removeEventListener('mousemove', this.moveNote);
			document.removeEventListener('mouseup', this.onMouseUp);
		}
	}

	onMouseDown(e) {
		this.setState({
			moving: true,
			delta: {
				x: e.pageX - this.state.x,
				y: e.pageY - this.state.y
			}
		});
		e.stopPropagation();
		e.preventDefault();
	}
	onMouseUp(e) {
		this.setState({moving: false});
		e.stopPropagation();
		e.preventDefault();
	}
	moveNote(e) {
		if (!this.state.moving) return;
		this.setState({
			x: e.pageX - this.state.delta.x,
			y: e.pageY - this.state.delta.y
		});
		e.stopPropagation();
		e.preventDefault();
	}

	clickNote(e) {
		this.props.clickNote();
	}

	render() {
		const noteClass = this.props.isSelected ? 'postit-note note-back' : 'postit-note';
		return (
			<div className={noteClass} style={getPostItStyles(this.state.x, this.state.y, this.props.isSelected, this.state.moving)}>
				<span onMouseDown={this.onMouseDown} className="postit-title">Drag and drop</span>
				<span className="postit-delete" onClick={this.props.deleteNote}>X</span>

				<div onClick={this.clickNote} className="postit-content">{this.props.text}</div>
			</div>
		);
	}
}
