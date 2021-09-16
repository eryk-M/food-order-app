import React from 'react';

import {
	GiHamburger,
	GiRoastChicken,
	GiBeerBottle,
	GiFrenchFries,
} from 'react-icons/gi';
import { BiGridAlt } from 'react-icons/bi';

import { MdKeyboardArrowRight } from 'react-icons/md';

import {
	SideBarContainer,
	SideBarList,
	SideBarItem,
} from './SideBarElements';
const Sidebar = () => {
	return (
		<SideBarContainer>
			<SideBarList>
				<SideBarItem className="active">
					<BiGridAlt />
					All
					<MdKeyboardArrowRight className="icon-arrow" />
				</SideBarItem>
				<SideBarItem>
					<GiHamburger />
					Burgers
					<MdKeyboardArrowRight className="icon-arrow" />
				</SideBarItem>
				<SideBarItem>
					<GiRoastChicken />
					Chicken
					<MdKeyboardArrowRight className="icon-arrow" />
				</SideBarItem>
				<SideBarItem>
					<GiFrenchFries />
					Fries
					<MdKeyboardArrowRight className="icon-arrow" />
				</SideBarItem>
				<SideBarItem>
					<GiBeerBottle />
					Drinks
					<MdKeyboardArrowRight className="icon-arrow" />
				</SideBarItem>
			</SideBarList>
		</SideBarContainer>
	);
};

export default Sidebar;
