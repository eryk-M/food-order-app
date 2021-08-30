import React from 'react';

import {
	NavBurgerContainer,
	NavBurgerIcons,
	NavBurgerList,
	NavBurgerItem,
	NavBurgerLink,
	NavBurgerIconLink,
	NavBurgerClose,
} from './NavBurgerElements';
import {
	NavCart,
	NavUser,
	NavCartSpan,
	NavLink,
} from '../NavBar/NavBarElements';
const NavBarBurger = ({ hidden, toggle }) => {
	return (
		<NavBurgerContainer right={hidden ? '-35rem' : '0'}>
			<NavBurgerClose onClick={toggle}>X</NavBurgerClose>
			<NavBurgerIcons>
				<NavBurgerIconLink to="/login">
					<NavUser fontSize="4.5rem" />
				</NavBurgerIconLink>
				<NavBurgerIconLink to="/cart">
					<NavCart fontSize="4.5rem" />
					<NavCartSpan top="2.5rem" right="5rem">
						2
					</NavCartSpan>
				</NavBurgerIconLink>
			</NavBurgerIcons>
			<NavBurgerList>
				<NavBurgerItem>
					<NavBurgerLink>Menu1</NavBurgerLink>
				</NavBurgerItem>
				<NavBurgerItem>
					<NavBurgerLink>Menu1</NavBurgerLink>
				</NavBurgerItem>
				<NavBurgerItem>
					<NavBurgerLink>Menu1</NavBurgerLink>
				</NavBurgerItem>
			</NavBurgerList>
		</NavBurgerContainer>
	);
};

export default NavBarBurger;
