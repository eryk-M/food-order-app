import React from 'react';

import {
	SideBarContainer,
	SideBarList,
	SideBarItem,
} from './SideBarElements';

import Search from './Search';
import PriceFilter from './PriceFilter';

const Sidebar = () => {
	return (
		<SideBarContainer>
			<Search />
			<PriceFilter />
			<SideBarList>
				<SideBarItem>Burgers</SideBarItem>
				<SideBarItem>Chicken</SideBarItem>
				<SideBarItem>Drinks</SideBarItem>
			</SideBarList>
		</SideBarContainer>
	);
};

export default Sidebar;
