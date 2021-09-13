import React, { useContext } from 'react';

import {
	NavBurgerContainer,
	NavBurgerIcons,
	NavBurgerList,
	NavBurgerItem,
	NavBurgerLink,
	NavBurgerIconLink,
	NavBurgerClose,
	NavBurgerOverlay,
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
		<>
			<NavBurgerOverlay
				onClick={toggle}
				display={hidden ? 'none' : 'block'}
			/>
			<NavBurgerContainer right={hidden ? '-35rem' : '0'}>
				<NavBurgerClose onClick={toggle}>X</NavBurgerClose>
				<NavBurgerIcons>
					<NavBurgerIconLink to="/user" onClick={toggle}>
						<NavUser fontSize="4.5rem" />
					</NavBurgerIconLink>
					<NavBurgerIconLink to="/cart" onClick={toggle}>
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
						<NavBurgerLink to="/" onClick={toggle}>
							Menu1
						</NavBurgerLink>
					</NavBurgerItem>
					<NavBurgerItem>
						<NavBurgerLink to="/" onClick={toggle}>
							Menu1
						</NavBurgerLink>
					</NavBurgerItem>
					<NavBurgerItem>
						<NavBurgerLink to="/food-tracker" onClick={toggle}>
							Food Tracker
						</NavBurgerLink>
					</NavBurgerItem>
				</NavBurgerList>
			</NavBurgerContainer>
		</>
	);
};

export default NavBarBurger;
