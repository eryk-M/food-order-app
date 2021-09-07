import styled, { keyframes } from 'styled-components/macro';
// import {keyframes} from 'styled-components'

import { GiConfirmed } from 'react-icons/gi';
import { BiErrorCircle } from 'react-icons/bi';
const fadeInRight = keyframes`
from {
    right: -100%;
}

to {
    right: 0;
}
`;

export const AlertContainer = styled.div`
	position: absolute;
	top: -5rem;
	right: 0;
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
	animation: ${fadeInRight} 0.71s cubic-bezier(0.075, 0.82, 0.165, 1);
`;
export const AlertSuccessIcon = styled(GiConfirmed)`
	margin-right: 0.5rem;
	font-size: 2rem;
`;
