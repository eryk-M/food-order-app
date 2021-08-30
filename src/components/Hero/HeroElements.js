import styled from 'styled-components/macro';

import ImgBg from '../../images/header-burger-2.jpg';

export const HeroContainer = styled.div`
	background-image: url(${ImgBg});
	background-position: center;
	background-size: cover;
	height: 100vh;
	width: 100%;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
`;

export const HeroH1 = styled.h1``;
