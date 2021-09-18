import React from 'react';

import { MdKeyboardArrowRight } from 'react-icons/md';

import {
	TreeNavLink,
	TreeP,
	TreeList,
	TreeItem,
	Tree,
	TreeItemMain,
} from './TreeMenuElements';
const TreeMenu = ({ text, mainIcon, list }) => {
	return (
		<Tree>
			<TreeItemMain activeClassName="is-active">
				{React.createElement(mainIcon, { className: 'icon-left' })}
				<TreeP>{text}</TreeP>
				<MdKeyboardArrowRight className="icon-arrow" />
			</TreeItemMain>
			<TreeList>
				{list.map((el, i) => (
					<TreeItem key={i}>
						<TreeNavLink to={el.path}>
							{React.createElement(el.icon)}
							{el.text}
						</TreeNavLink>
					</TreeItem>
				))}
			</TreeList>
		</Tree>
	);
};

export default TreeMenu;
