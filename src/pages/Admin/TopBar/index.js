import React from 'react';

import {
	TopBarNav,
	TopBarList,
	TopBarItem,
	TopBarNavLink,
} from './TopBarElements';

import { FcMenu } from 'react-icons/fc';

const TopBar = ({ setHidden, hidden }) => {
	return (
		<TopBarNav className={hidden ? 'is-hidden-content' : ''}>
			<TopBarList>
				<TopBarItem>
					<TopBarNavLink
						to="#"
						onClick={() => setHidden((prevHidden) => !prevHidden)}
					>
						<FcMenu />
					</TopBarNavLink>
				</TopBarItem>
				<TopBarItem>
					<TopBarNavLink to="/">Home</TopBarNavLink>
				</TopBarItem>
				<TopBarItem>
					<TopBarNavLink to="/products">Products</TopBarNavLink>
				</TopBarItem>
				<TopBarItem>
					<TopBarNavLink to="/food-tracker">
						Food Tracker
					</TopBarNavLink>
				</TopBarItem>
				<TopBarItem>
					<TopBarNavLink to="/">Menu4</TopBarNavLink>
				</TopBarItem>
			</TopBarList>
		</TopBarNav>
	);
};

export default TopBar;
