import React from 'react';
import ReactDOM from 'react-dom';
import NoteBoard from './components/NoteBoard';
import './styles/main.scss';

const Main = () => {
	return (
		<div>
			<NoteBoard />
		</div>
	);
};

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
	module.hot.accept();
}
