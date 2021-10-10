import React from 'react';

import { Switch, Route } from 'react-router-dom';

// import List from './List';
import Add from './Add';
import Info from 'components/Admin/Info';

const Quiz = () => {
	return (
		<>
			<Info>
				- Quizzes and coupons are working with main page as well. You
				can add, delete quizzes and test them with coupons in user
				panel.
			</Info>
			<Switch>
				{/* <Route path="/admin/products" exact component={List} /> */}
				<Route path="/admin/quiz/add" exact component={Add} />
			</Switch>
		</>
	);
};

export default Quiz;
