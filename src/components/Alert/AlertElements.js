import styled, { keyframes } from 'styled-components/macro';

import { GiConfirmed } from 'react-icons/gi';
const fadeIn = keyframes`
from {
    opacity: 0%;
}

to {
    opacity: 100%;
}
`;

export const AlertContainer = styled.div`
	position: absolute;
	top: ${(props) => props.top};
	right: ${(props) => props.right};
	font-size: 1.6rem;
	color: #fff;
	background-color: ${(props) => {
		if (props.success) {
			return 'var(--color-green)';
		}
	}};
	padding: 1rem;
	display: flex;
	align-items: center;
	opacity: 100%;
	font-weight: 100;
	border-radius: 0.5rem;
	animation: ${fadeIn} 0.71s cubic-bezier(0.075, 0.82, 0.165, 1);
`;
export const AlertSuccessIcon = styled(GiConfirmed)`
	margin-right: 0.5rem;
	font-size: 2rem;
`;
