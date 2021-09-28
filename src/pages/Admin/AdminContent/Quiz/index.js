import React from 'react';

import { Switch, Route } from 'react-router-dom';

// import List from './List';
import Add from './Add';

const Quiz = () => {
	return (
		<Switch>
			{/* <Route path="/admin/products" exact component={List} /> */}
			<Route path="/admin/quiz/add" exact component={Add} />
		</Switch>
	);
};

export default Quiz;
