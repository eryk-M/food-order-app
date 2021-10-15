import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const SearchHint = styled.span`
	position: absolute;
	top: -3rem;
	background-color: var(--color-primary);
	color: #fff;
	padding: 0.5rem;
	border-radius: 5px;
	left: 0;
	opacity: ${({ query }) => {
		if (query.length === 0 || query.length >= 3) {
			return 0;
		} else return 1;
	}};
	transition: visibility 0s, opacity 0.2s ease;
	visibility: ${({ query }) => {
		if (query.length === 0 || query.length >= 3) {
			return 'hidden';
		} else return 'visible';
	}};
	@media ${device.tablet} {
		font-size: 1.4rem;
	}
`;
export const SearchContainer = styled.div`
	width: ${({ width }) => width ?? ''};

	& input:focus + ${SearchHint} {
		opacity: ${({ query }) => {
			if (query.length === 0 || query.length < 3) {
				return 1;
			} else return 0;
		}};
		visibility: ${({ query }) => {
			if (query.length === 0 || query.length < 3) {
				return 'visible';
			} else return 'hidden';
		}};
	}
`;
