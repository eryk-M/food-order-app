import styled from 'styled-components/macro';

import LoginBackground from '../../images/login-background.jpg';

export const LoginContainer = styled.div`
	display: flex;
	width: 100%;
	height: calc(100vh - 10rem);

	@media screen and (max-width: 840px) {
		flex-direction: column;
	}
`;

export const LoginLeft = styled.div`
	background-image: url(${LoginBackground});
	background-position: center;
	background-size: cover;
	width: 50%;
	position: relative;
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(231, 39, 45, 0.4);
	}
	@media screen and (max-width: 840px) {
		width: 100%;
		height: 30rem;
	}
`;

export const LoginContent = styled.div`
	color: var(--color-grey-light);
	top: 30%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	position: absolute;
	z-index: 1;
	@media screen and (max-width: 840px) {
		top: 15rem;
	}
`;

export const LoginHeading = styled.h1`
	font-size: 5rem;
	@media screen and (max-width: 840px) {
		font-size: 3rem;
	}
`;

export const LoginDesc = styled.p`
	font-size: 2rem;
	margin-top: 5rem;
	text-align: left;
	@media screen and (max-width: 840px) {
		font-size: 1.8rem;
	}
`;

export const LoginRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 50%;

	@media screen and (max-width: 840px) {
		width: 100%;
	}
`;
