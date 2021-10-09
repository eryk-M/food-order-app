import React, { useState } from 'react';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
	TreeNavLink,
	TreeP,
	TreeList,
	TreeItem,
	Tree,
	TreeItemMain,
} from './TreeMenuElements';
const TreeMenu = ({
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
		>
			<TreeItemMain
				activeClassName="is-active"
				onClick={() => setClosed((currClosed) => !currClosed)}
				hidden={hidden && width > 1024}
			>
				{React.createElement(mainIcon, { className: 'icon-left' })}
				<TreeP hidden={hidden && width > 1024}>{text}</TreeP>
				<MdKeyboardArrowDown
					style={closed ? null : rotateArrowList}
					className="icon-arrow"
					hidden={hidden && width > 1024}
				/>
			</TreeItemMain>

			<TreeList
				className={!closed ? 'tree-menu-opened' : 'tree-menu-closed'}
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
					</TreeItem>
				))}
			</TreeList>
		</Tree>
	);
};

export default TreeMenu;
