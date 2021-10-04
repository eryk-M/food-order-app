import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const AdminPanelHeading = styled.h2`
	text-align: center;
	font-size: 2.4rem;
	padding-bottom: 2rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	margin-bottom: 1rem;

	@media ${device.mobileM} {
		font-size: 2rem;
	}
`;

export const MainPageHeading = styled.h2`
	font-size: 3rem;
	padding: 1rem 0;
	border-bottom: 1px solid var(--color-primary);
	align-self: flex-start;
	position: relative;
	display: inline-block;
	&:before {
		content: '${(props) => props.upper}';
		position: absolute;
		top: -2rem;
		left: 0;
		font-size: 1.8rem;
		font-family: 'Shadows Into Light Two', handwriting;
		color: var(--color-primary);
		font-weight: 100;
	}
`;
