import React, { useState } from 'react';

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

const Sidebar = ({ setCategory }) => {
	const [appState, changeState] = useState({
		activeObject: null,
		objects: [
			{ name: 'All', icon: BiGridAlt },
			{ name: 'Burgers', icon: GiHamburger },
			{ name: 'Chicken', icon: GiRoastChicken },
			{ name: 'Fries', icon: GiFrenchFries },
			{ name: 'Drinks', icon: GiBeerBottle },
		],
	});

	if (!appState.activeObject)
		changeState({ ...appState, activeObject: appState.objects[0] });

	const toggleActive = (index) => {
		changeState({
			...appState,
			activeObject: appState.objects[index],
		});
	};

	const toggleActiveStyles = (index) => {
		if (appState.objects[index] === appState.activeObject) {
			return 'active';
		} else {
			return '';
		}
	};

	return (
		<SideBarContainer>
			<SideBarList>
				{appState.objects.map(({ name, icon }, i) => (
					<SideBarItem
						key={i}
						data-category={name}
						onClick={(e) => {
							setCategory(e.currentTarget.dataset.category);
							toggleActive(i);
						}}
						className={toggleActiveStyles(i)}
					>
						{React.createElement(icon)}
						<span>{name}</span>
						<MdKeyboardArrowRight className="icon-arrow" />
					</SideBarItem>
				))}
			</SideBarList>
		</SideBarContainer>
	);
};

export default Sidebar;
