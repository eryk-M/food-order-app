import React, { useState } from 'react';

import styled from 'styled-components/macro';

import SideBar from './SideBar';
import AdminContent from './AdminContent';
import TopBar from './TopBar';

const AdminContentContainer = styled.div`
	margin-top: 6rem;
	margin-left: 25rem;
	padding-bottom: 2rem;
	padding-top: 2rem;
	padding-left: 2rem;
	transition: margin-left 0.2s ease-in-out;
	min-height: calc(100vh - 6rem);
	background-color: #93949417;
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
