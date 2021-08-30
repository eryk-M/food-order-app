import React from 'react';
import Logo from '../../images/logo.png';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
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

const NavBar = ({ width }) => {
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
			return <NavBurger />;
		}
	};

	return (
		<Nav>
			<NavWrapper>
				<NavLogo to="/">
					<NavLogoImage src={Logo} />
				</NavLogo>
				{switchMenu()}
			</NavWrapper>
		</Nav>
	);
};

export default NavBar;
