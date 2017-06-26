import React from 'react';

const getPostItStyles = (x, y, isSelected, moving) => {
	if (isSelected) {
		return {}
	}
	else {
		return moving
			? {
				left: x || 0,
				top: y || 0,
				transition: 'none'
			} : {
				left: x || 0,
				top: y || 0
			}
	}

};

export default class PostItNote extends React.PureComponent{
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

	componentDidUpdate(props, state) {
		if (this.state.moving && !state.moving) {
			document.addEventListener('mousemove', this.moveNote)
			document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.moving && state.moving) {
			document.removeEventListener('mousemove', this.moveNote)
			document.removeEventListener('mouseup', this.onMouseUp)
		}
	}

	onMouseDown(e) {
		// only left mouse button
		if (e.button !== 0) return
		this.setState({
			moving: true,
			delta: {
				x: e.pageX - this.state.x,
				y: e.pageY - this.state.y
			}
		})
		e.stopPropagation()
		e.preventDefault()
	}
	onMouseUp(e) {
		this.setState({moving: false})
		e.stopPropagation()
		e.preventDefault()
	}
	moveNote(e) {
		if (!this.state.moving) return
		this.setState({
			x: e.pageX - this.state.delta.x,
			y: e.pageY - this.state.delta.y
		})
		e.stopPropagation()
		e.preventDefault()
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
		)
	}
}
