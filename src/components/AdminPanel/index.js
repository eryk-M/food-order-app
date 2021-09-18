import React, { useState } from 'react';

import styled from 'styled-components/macro';

import SideBar from './SideBar';
import AdminContent from './AdminContent';
import TopBar from './TopBar';

const AdminContentContainer = styled.div`
	margin-left: 27rem;
	margin-top: 2rem;
	transition: margin-left 0.2s ease-in-out;
`;

const AdminPanel = () => {
	const [hidden, setHidden] = useState(false);

	return (
		<>
			<TopBar setHidden={setHidden} hidden={hidden} />
			<SideBar hidden={hidden} />
			<AdminContentContainer
				className={hidden ? 'is-hidden-content' : ''}
			>
				<AdminContent hidden={hidden} />
			</AdminContentContainer>
		</>
	);
};

export default AdminPanel;
