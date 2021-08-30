import styled from 'styled-components/macro';

import ImgBg from '../../images/header-burger-2.jpg';

export const HeroContainer = styled.header`
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

export const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	position: absolute;
	top: 45vh;
	max-height: 100%;
	padding: 0 2rem;
	width: 65rem;
	color: var(--color-white);
	text-transform: uppercase;
	line-height: 1;
	font-weight: bold;
	z-index: 2;
	position: relative;
	@media screen and (max-width: 650px) {
		width: 100%;
	}
`;

export const HeroWrapper = styled.div`
	max-width: 136rem;
	margin: 0 auto;
`;

export const HeroH1 = styled.h1`
	font-size: clamp(2.5rem, 10vw, 5rem);
	margin-bottom: 1rem;
	box-shadow: 3px 5px var(--color-secondary);
	letter-spacing: 3px;
`;

export const HeroP = styled.p`
	font-family: ${(props) => props.fontFamily};
	font-size: clamp(2rem, 2.5vw, 3rem);
	margin-top: 1.2rem;
	margin-bottom: 2rem;
	color: ${(props) => props.color};
	font-weight: 400;
`;
