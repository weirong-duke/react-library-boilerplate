import React from 'react';
import ReactDOM from 'react-dom';
import NoteBoard from './NoteBoard';
import './styles/main.scss';

class Main extends React.Component {
	render() {
		return <div>
			<NoteBoard />
		</div>
	}
}

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
	module.hot.accept();
}
