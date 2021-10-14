import React from 'react';
import notFound from 'assets/images/not-found.svg';
import styled from 'styled-components/macro';
import { MainPageHeading } from 'components';
import { device } from 'utils/breakpoints';

const NotFoundImage = styled.img`
	height: 50rem;
	display: block;
	margin: 6rem auto;
	@media ${device.laptopS} {
		height: 30rem;
	}

	@media ${device.mobileL} {
		height: 20rem;
	}
`;

const NotFoundContainer = styled.div`
	text-align: center;
	margin: 4rem 0;
`;
export const NotFound = () => {
	return (
		<NotFoundContainer>
			<MainPageHeading>Page not found</MainPageHeading>
			<NotFoundImage src={notFound} alt="404"></NotFoundImage>
		</NotFoundContainer>
	);
};
