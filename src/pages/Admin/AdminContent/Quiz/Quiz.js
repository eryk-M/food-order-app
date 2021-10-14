import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { AdminQuizAdd, AdminQuizList } from 'pages';
import { Info } from 'components';
// import List from './List';

const Quiz = () => {
	return (
		<>
			<Info>
				- Quizzes and coupons are working with main page as well. You
				can add, delete quizzes and test them with coupons in user
				panel.
			</Info>
			<Switch>
				<Route path="/admin/quiz" exact component={AdminQuizList} />
				<Route
					path="/admin/quiz/add"
					exact
					component={AdminQuizAdd}
				/>
				<Route>
					<Redirect to="/404" />
				</Route>
			</Switch>
		</>
	);
};

export default Quiz;
