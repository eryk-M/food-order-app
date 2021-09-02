import React, { useContext } from 'react';

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
} from '../NavBar/NavBarElements';

import { CartContext } from '../../contexts/CartContext';

const NavBarBurger = ({ hidden, toggle }) => {
	const {
		state: { cart },
	} = useContext(CartContext);

	return (
		<NavBurgerContainer right={hidden ? '-35rem' : '0'}>
			<NavBurgerClose onClick={toggle}>X</NavBurgerClose>
			<NavBurgerIcons>
				<NavBurgerIconLink to="/login">
					<NavUser fontSize="4.5rem" />
				</NavBurgerIconLink>
				<NavBurgerIconLink to="/cart">
					<NavCart fontSize="4.5rem" />
					{cart.length >= 1 && (
						<NavCartSpan top="2.5rem" right="5rem">
							{cart.length}
						</NavCartSpan>
					)}
				</NavBurgerIconLink>
			</NavBurgerIcons>
			<NavBurgerList>
				<NavBurgerItem>
					<NavBurgerLink to="/">Menu1</NavBurgerLink>
				</NavBurgerItem>
				<NavBurgerItem>
					<NavBurgerLink to="/">Menu1</NavBurgerLink>
				</NavBurgerItem>
				<NavBurgerItem>
					<NavBurgerLink to="/">Menu1</NavBurgerLink>
				</NavBurgerItem>
			</NavBurgerList>
		</NavBurgerContainer>
	);
};

export default NavBarBurger;
