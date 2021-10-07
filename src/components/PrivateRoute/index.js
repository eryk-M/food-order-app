import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const PrivateRoute = ({ component: Component, query, ...rest }) => {
	const { currentUser } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} {...rest} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							query: props.location.pathname.query,
						}}
					/>
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
