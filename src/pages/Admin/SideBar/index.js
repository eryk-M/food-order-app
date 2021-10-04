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
	SideBarClose,
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
import TreeMenu from 'components/Admin/TreeMenu';

import { treeProducts, treeQuiz } from 'helpers/treeMenus';

const SideBar = ({ width, hidden, setHidden }) => {
	const { logout } = useAuth();

	return (
		<SideBarContainer
			className={
				hidden && width > 1024
					? 'is-hidden-menu-desktop'
					: hidden && width <= 1024
					? 'is-hidden-menu-mobile'
					: ''
			}
		>
			{width <= 1024 && (
				<SideBarClose
					onClick={() => setHidden((prevHidden) => !prevHidden)}
				>
					X
				</SideBarClose>
			)}
			<SideBarLogo to="/">
				<SideBarLogoImage src={logo} alt="logo" />
			</SideBarLogo>

			<SideBarList>
				<SideBarItem>
					<SideBarLink
						to="/admin"
						exact
						activeClassName="is-active"
						onClick={
							width <= 1024
								? () => setHidden((prevHidden) => !prevHidden)
								: undefined
						}
					>
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
						onClick={
							width <= 1024
								? () => setHidden((prevHidden) => !prevHidden)
								: undefined
						}
					>
						<FiTruck className="icon-left" />
						<SideBarP>Orders</SideBarP>
						<MdKeyboardArrowRight className="icon-arrow" />
					</SideBarLink>
				</SideBarItem>

				<SideBarTree>
					<TreeMenu
						setHidden={setHidden}
						width={width}
						{...treeProducts}
						hidden={hidden}
					/>
					<TreeMenu
						setHidden={setHidden}
						width={width}
						{...treeQuiz}
						hidden={hidden}
					/>
				</SideBarTree>
				<SideBarItem>
					<SideBarLink
						to="/admin/coupons"
						exact
						activeClassName="is-active"
						onClick={
							width <= 1024
								? () => setHidden((prevHidden) => !prevHidden)
								: undefined
						}
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
