import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const SearchFormContainer = styled.div`
	padding-bottom: 1rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media ${device.mobileL} {
		margin: 2rem 2rem;
	}

	@media ${device.mobileM} {
		flex-direction: column-reverse;
		align-items: flex-start;
		margin-top: 2rem;
		margin-bottom: 1rem;
		border: none;
	}
`;
