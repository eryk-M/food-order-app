import React, { useState } from 'react';

import styled from 'styled-components/macro';
import { AdminSideBar, AdminContent, AdminTopBar } from 'pages';

import { useWindowSize } from 'hooks';

const AdminContentContainer = styled.div`
	margin-top: 6rem;
	margin-left: 25rem;
	padding-bottom: 2rem;
	padding-top: 2rem;
	padding-left: 2rem;
	transition: margin-left 0.2s ease-in-out;
	min-height: calc(100vh - 6rem);
	background-color: var(--color-background-grey-light);

	@media only screen and (max-width: 1024px) {
		margin-left: 0;
	}
`;

export const Admin = () => {
	const [hidden, setHidden] = useState(false);
	const { width } = useWindowSize();

	return (
		<>
			<AdminTopBar
				width={width}
				setHidden={setHidden}
				hidden={hidden}
			/>
			<AdminSideBar
				width={width}
				hidden={hidden}
				setHidden={setHidden}
			/>
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
