import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const LoginContainer = styled.div`
	display: flex;
	width: 100%;
	height: 80rem;
	background-color: var(--color-background-grey-light);
	@media ${device.mobileM} {
		height: unset;
	}
`;

export const LoginCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #fff;
	position: absolute;
	top: 50rem;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
	min-width: 50rem;
	min-height: 55rem;
	padding: 5rem;
	border-radius: 0.5rem;

	@media ${device.mobileM} {
		width: 100%;
		position: static;
		transform: translate(0, 0);
		min-width: unset;
	}
	@media ${device.mobileS} {
		padding: 5rem 3rem;
	}
`;
