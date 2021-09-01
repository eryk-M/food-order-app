import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';

import UserProfile from '../../components/UserProfile';
import UpdateProfile from '../../components/UpdateProfile';
const User = () => {
	return (
		<>
			<h2>User profile</h2>
			<PrivateRoute path="/user" exact component={UserProfile} />
			<PrivateRoute
				path="/user/update-profile"
				exact
				component={UpdateProfile}
			/>
		</>
	);
};

export default User;
