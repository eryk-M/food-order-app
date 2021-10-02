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
import { SlideDown } from 'react-slidedown';

const TreeMenu = ({ text, mainIcon, list, hidden }) => {
	const [closed, setClosed] = useState(true);

	const rotateArrowList = {
		transform: 'rotate(180deg)',
	};

	return (
		<Tree className={hidden ? 'is-hidden-menu' : ''}>
			<TreeItemMain
				activeClassName="is-active"
				onClick={() => setClosed((currClosed) => !currClosed)}
				hidden={hidden}
			>
				{React.createElement(mainIcon, { className: 'icon-left' })}
				<TreeP hidden={hidden}>{text}</TreeP>
				<MdKeyboardArrowDown
					style={closed ? null : rotateArrowList}
					className="icon-arrow"
					hidden={hidden}
				/>
			</TreeItemMain>
			<SlideDown className="my-dropdown-slidedown" closed={closed}>
				<TreeList>
					{list.map((el, i) => (
						<TreeItem key={i}>
							<TreeNavLink
								exact
								to={el.path}
								activeClassName="is-active"
								hidden={hidden}
							>
								{React.createElement(el.icon)}
								<TreeP>{el.text}</TreeP>
								<MdKeyboardArrowRight className="icon-arrow" />
							</TreeNavLink>
						</TreeItem>
					))}
				</TreeList>
			</SlideDown>
		</Tree>
	);
};

export default TreeMenu;
