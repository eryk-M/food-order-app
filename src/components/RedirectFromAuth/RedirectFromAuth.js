import React from 'react';
import { Redirect } from 'react-router-dom';
import { AdminAPIProvider } from 'contexts';
import { useHistory } from 'react-router';

import { User, Admin } from 'pages';

import { PrivateRoute } from 'components';

export const RedirectFromAuth = () => {
	const history = useHistory();

	if (
		history.location.pathname.includes('/user') ||
		history.location.pathname.includes('/admin')
	) {
		return (
			<>
				<PrivateRoute path="/user" component={User} />
				<AdminAPIProvider>
					<PrivateRoute path="/admin" component={Admin} />
				</AdminAPIProvider>
			</>
		);
	} else {
		return <Redirect to="/404" />;
	}
};
