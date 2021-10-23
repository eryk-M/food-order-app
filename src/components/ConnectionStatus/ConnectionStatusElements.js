import styled, { keyframes } from 'styled-components/macro';
import { RiSignalWifiOffFill } from 'react-icons/ri';
import { ImConnection } from 'react-icons/im';

import { motion } from 'framer-motion';
const timeout = keyframes`
from {
    width: 0;
}

to {
    width: 100%;
}
`;
export const Connected = styled(ImConnection)`
	fill: var(--color-green);
`;
export const Disconnected = styled(RiSignalWifiOffFill)`
	fill: var(--color-red);
`;
export const ConnectionContainer = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	padding: 2rem;
	font-size: 1.6rem;
	background-color: #494949;
	color: var(--color-white);
	position: fixed;
	z-index: 10000;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	font-weight: 300;
	width: 30rem;
	text-align: center;
	overflow: hidden;
	& svg {
		vertical-align: middle;
		margin-right: 2rem;
		font-size: 2.4rem;
	}
	.animate-progress {
		animation: ${timeout} 3s linear;
	}
`;
export const Progress = styled.div`
	position: absolute;
	top: 93%;
	left: 0;
	background-color: var(--color-green);
	height: 4px;
	width: 100%;
	visibility: ${({ flag }) => (!flag ? 'hidden' : 'visible')};
`;
