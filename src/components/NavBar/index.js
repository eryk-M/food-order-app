import React, { useContext, useState, useEffect } from 'react';
import Logo from 'images/logo.png';
import {
	Nav,
	NavLogo,
	NavLogoImage,
	NavList,
	NavLink,
	NavItem,
	NavWrapper,
	NavCartSpan,
	NavCart,
	NavUser,
	NavBurger,
} from './NavBarElements';

import { useAuth } from 'contexts/AuthContext';
import { withRouter } from 'react-router-dom';

import { CartContext } from 'contexts/CartContext';

import { useWindowSize } from 'hooks/useWindowSize';

const NavBar = (props) => {
	const { currentUser } = useAuth();
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
	const size = useWindowSize();

	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	useEffect(() => {
		if (localStorage.getItem('cart') && !isInitiallyFetched) {
			dispatch({
				type: 'SET_ITEMS',
				payload: JSON.parse(localStorage.getItem('cart')),
			});
			setIsInitiallyFetched(true);
		}
	}, [isInitiallyFetched, dispatch]);

	const stylesNav = {
		position: 'static',
		backgroundColor: 'var(--color-grey-dark)',
		padding: '1rem 4rem',
		height: '10rem',
	};

	const stylesLogo = {
		height: '8rem',
	};

	const { pathname } = props.location;
	const { toggle } = props;
	const switchMenu = () => {
		if (size.width > 840) {
			return (
				<>
					<NavList>
						<NavItem>
							<NavLink to="/">Menu1</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/">Menu2</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/food-tracker">Food tracker</NavLink>
						</NavItem>
					</NavList>
					<NavLink to={currentUser ? '/user' : '/login'}>
						<NavUser fontSize="3rem" />
					</NavLink>
					<NavLink to="/cart">
						<NavCart />
						{cart.length >= 1 && (
							<NavCartSpan>{cart.length}</NavCartSpan>
						)}
					</NavLink>
				</>
			);
		} else {
			return <NavBurger onClick={toggle} />;
		}
	};
	return (
		<Nav style={pathname === '/' ? null : stylesNav}>
			<NavWrapper>
				<NavLogo to="/">
					<NavLogoImage
						style={pathname === '/' ? null : stylesLogo}
						src={Logo}
					/>
				</NavLogo>
				{switchMenu()}
			</NavWrapper>
		</Nav>
	);
};

export default withRouter(NavBar);
