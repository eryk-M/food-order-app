import React, { useContext, useState, useEffect } from 'react';
import Logo from 'assets/images/logo.png';
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

import { useAuth, CartContext } from 'contexts';
import { withRouter } from 'react-router-dom';

import { useWindowSize } from 'hooks/useWindowSize';

const NavBar = (props) => {
	const { currentUser } = useAuth();
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
	const [scroll, setScroll] = useState(false);

	const size = useWindowSize();

	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 1);
		});
		return () => {
			window.removeEventListener('scroll', null);
		};
	}, []);

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
	const { width } = size;

	const switchMenu = () => {
		if (width > 840) {
			return (
				<>
					<NavList>
						<NavItem>
							<NavLink
								to={{
									pathname: '/login',
									query: '/admin',
								}}
							>
								Admin
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/products">Products</NavLink>
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

	const conditionalMenu = () => {
		if (pathname === '/') {
			return null;
		} else if (pathname.substring(0, 6) === '/admin') {
			return { display: 'none' };
		} else return stylesNav;
	};

	return (
		<Nav
			style={conditionalMenu()}
			className={scroll ? 'fixed-menu' : ''}
		>
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
