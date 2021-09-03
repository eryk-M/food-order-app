import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';

import UserProfile from '../../components/User/UserProfile';
import UpdateProfile from '../../components/User/UpdateProfile';
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
