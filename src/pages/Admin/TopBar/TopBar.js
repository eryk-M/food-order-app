import React from 'react';

import {
	TopBarNav,
	TopBarList,
	TopBarItem,
	TopBarNavLink,
} from './TopBarElements';

import { FcMenu } from 'react-icons/fc';

const TopBar = ({ width, setHidden, hidden }) => {
	return (
		<TopBarNav
			className={
				hidden && width > 1024 ? 'is-hidden-content-desktop' : ''
			}
		>
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
			</TopBarList>
		</TopBarNav>
	);
};

export default TopBar;
