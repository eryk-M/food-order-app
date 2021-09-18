import React, { useState } from 'react';

import {
	SideBarLogo,
	SideBarLogoImage,
	SideBarContainer,
	SideBarList,
	SideBarItem,
	SideBarLink,
	SideBarTree,
	SideBarP,
} from './SideBarElements';

import { useAuth } from 'contexts/AuthContext';

import { AiFillDashboard, AiOutlinePoweroff } from 'react-icons/ai';

import { MdKeyboardArrowRight } from 'react-icons/md';
import logo from 'images/logo.png';
import TreeMenu from './TreeMenu';

import { treeUsers, treeProducts } from 'helpers/treeMenus';

const SideBar = ({ hidden }) => {
	const { logout } = useAuth();
	return (
		<SideBarContainer className={hidden ? 'is-hidden-menu' : ''}>
			<SideBarLogo to="/">
				<SideBarLogoImage src={logo} />
			</SideBarLogo>

			<SideBarList>
				<SideBarItem>
					<SideBarLink to="/admin" exact activeClassName="is-active">
						<AiFillDashboard className="icon-left" />
						<SideBarP>Dashboard</SideBarP>
						<MdKeyboardArrowRight className="icon-arrow" />
					</SideBarLink>
				</SideBarItem>
				<SideBarTree>
					<TreeMenu {...treeProducts} />
					<TreeMenu {...treeUsers} />
				</SideBarTree>

				<SideBarItem>
					<SideBarLink to="#" onClick={() => logout()}>
						<AiOutlinePoweroff className="icon-left" />
						<SideBarP>Logout</SideBarP>
					</SideBarLink>
				</SideBarItem>
			</SideBarList>
		</SideBarContainer>
	);
};

export default SideBar;
