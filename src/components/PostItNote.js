import React from 'react';

const getPostItStyles = (x, y) => {
	console.log('getting styles', {
		left: x || 0,
		top: y || 0,
		width: "120px",
		height: "120px",
		borderRadius: "8px",
		border: "1px solid #BEB347",
		backgroundColor: "#ffea5b",
		position: "relative",
		cursor: "pointer",
		overflow: "hidden"
	})
	return {
		display: 'inline-block',
		left: x || 0,
		top: y || 0,
		width: "120px",
		height: "120px",
		border: "1px solid #BEB347",
		backgroundColor: "#ffea5b",
		position: "relative",
		cursor: "pointer",
		overflow: "hidden"
	}
};

export default class PostItNote extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			x: 0,
			y: 20,
			delta: {},
			moving: false
		};

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.moveNote = this.moveNote.bind(this);
		this.flipNote = this.flipNote.bind(this);
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

	flipNote(e) {
		console.log('clickced tho')
	}

	render() {

		return (
			<div style={getPostItStyles(this.state.x, this.state.y)}>
				<div onMouseDown={this.onMouseDown} style={{textAlign: "center", width: "100%", height: "20px", backgroundColor: "#beb347"}}>Drag and drop</div>
				<div onClick={this.flipNote} style={{height:"100%", width:"100%"}}>{this.props.text}</div>
			</div>
		)
	}
}
