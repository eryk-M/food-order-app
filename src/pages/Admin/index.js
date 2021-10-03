import React, { useState } from 'react';

import styled from 'styled-components/macro';

import SideBar from './SideBar';
import AdminContent from './AdminContent';
import TopBar from './TopBar';

import { useWindowSize } from 'hooks/useWindowSize';

const AdminContentContainer = styled.div`
	margin-top: 6rem;
	margin-left: 25rem;
	padding-bottom: 2rem;
	padding-top: 2rem;
	padding-left: 2rem;
	transition: margin-left 0.2s ease-in-out;
	min-height: calc(100vh - 6rem);
	background-color: #93949417;

	@media only screen and (max-width: 1024px) {
		margin-left: 0;
	}
`;

const AdminPage = () => {
	const [hidden, setHidden] = useState(false);
	const size = useWindowSize();

	const { width } = size;

	return (
		<>
			<TopBar width={width} setHidden={setHidden} hidden={hidden} />
			<SideBar width={width} hidden={hidden} setHidden={setHidden} />
			<AdminContentContainer
				className={
					hidden && width > 1024 ? 'is-hidden-content-desktop' : ''
				}
			>
				<AdminContent hidden={hidden} />
			</AdminContentContainer>
		</>
	);
};

export default AdminPage;
