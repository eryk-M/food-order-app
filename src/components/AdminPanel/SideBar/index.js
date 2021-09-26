import React from 'react';

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

import {
	AiFillDashboard,
	AiOutlinePoweroff,
	AiOutlinePercentage,
} from 'react-icons/ai';
import { FiTruck } from 'react-icons/fi';
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
				<SideBarItem>
					<SideBarLink
						to="/admin/orders"
						exact
						activeClassName="is-active"
					>
						<FiTruck className="icon-left" />
						<SideBarP>Orders</SideBarP>
						<MdKeyboardArrowRight className="icon-arrow" />
					</SideBarLink>
				</SideBarItem>

				<SideBarTree>
					<TreeMenu {...treeProducts} hidden={hidden} />
					<TreeMenu {...treeUsers} hidden={hidden} />
				</SideBarTree>
				<SideBarItem>
					<SideBarLink
						to="/admin/coupons"
						exact
						activeClassName="is-active"
					>
						<AiOutlinePercentage className="icon-left" />
						<SideBarP>Coupons</SideBarP>
						<MdKeyboardArrowRight className="icon-arrow" />
					</SideBarLink>
				</SideBarItem>
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
