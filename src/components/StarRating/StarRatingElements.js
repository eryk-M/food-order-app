import styled from 'styled-components/macro';

import { FaStar } from 'react-icons/fa';

export const StarLabel = styled.label``;

export const StarInput = styled.input`
	display: none;
`;

export const StarIcon = styled(FaStar)`
	cursor: ${(props) => (props.show === 'true' ? '' : 'pointer')};
	margin: 1rem 0 1rem 0.3rem;
`;
