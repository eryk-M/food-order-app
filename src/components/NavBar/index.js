import React from 'react';
import Logo from '../../images/logo.png';
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

import { withRouter } from 'react-router-dom';

const NavBar = (props) => {
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
	const { width, toggle } = props;
	const switchMenu = () => {
		if (width > 840) {
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
							<NavLink to="/">Menu3</NavLink>
						</NavItem>
					</NavList>
					<NavLink to="/login">
						<NavUser fontSize="3rem" />
					</NavLink>
					<NavLink to="/cart">
						<NavCart />
						<NavCartSpan>1</NavCartSpan>
					</NavLink>
				</>
			);
		} else {
			return <NavBurger onClick={toggle} />;
		}
	};
	// console.log(props);
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
