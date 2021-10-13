import React, { useState } from 'react';

import {
	MdKeyboardArrowRight,
	MdKeyboardArrowDown,
} from 'react-icons/md';
import {
	TreeNavLink,
	TreeP,
	TreeList,
	TreeItem,
	Tree,
	TreeItemMain,
} from './TreeMenuElements';
import { SideBarLinkTooltip } from 'pages/Admin/SideBar/SideBarElements';
export const TreeMenu = ({
	width,
	text,
	mainIcon,
	list,
	hidden,
	setHidden,
}) => {
	const [closed, setClosed] = useState(true);

	const rotateArrowList = {
		transform: 'rotate(180deg)',
	};

	return (
		<Tree
			className={
				hidden && width > 1024 ? 'is-hidden-menu-desktop' : ''
			}
			hiddenOverflow={hidden}
		>
			<TreeItemMain
				activeClassName="is-active"
				onClick={() => setClosed((currClosed) => !currClosed)}
				hidden={hidden && width > 1024}
			>
				{React.createElement(mainIcon, { className: 'icon-left' })}
				<TreeP hidden={hidden && width > 1024}>{text}</TreeP>
				<SideBarLinkTooltip>{text}</SideBarLinkTooltip>
				<MdKeyboardArrowDown
					style={closed ? null : rotateArrowList}
					className="icon-arrow"
					hidden={hidden && width > 1024}
				/>
			</TreeItemMain>
			{/* TODO: */}
			<TreeList
				className={!closed ? 'tree-menu-opened' : 'tree-menu-closed'}
				hiddenOverflow={hidden}
			>
				{list.map((el, i) => (
					<TreeItem key={i}>
						<TreeNavLink
							exact
							to={el.path}
							activeClassName="is-active"
							hidden={hidden && width > 1024}
							onClick={
								width <= 1024
									? () => setHidden((prevHidden) => !prevHidden)
									: undefined
							}
						>
							{React.createElement(el.icon)}
							<TreeP>{el.text}</TreeP>
							<MdKeyboardArrowRight className="icon-arrow" />
						</TreeNavLink>
						<SideBarLinkTooltip>{el.text}</SideBarLinkTooltip>
					</TreeItem>
				))}
			</TreeList>
		</Tree>
	);
};
