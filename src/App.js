import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';

import Home from './pages/Home';

function App() {
	return (
		<div className="App">
			<Router>
				<GlobalStyle />
				<Route path="/" exact component={Home} />
			</Router>
		</div>
	);
}

export default App;
