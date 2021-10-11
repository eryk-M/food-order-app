import styled, { keyframes } from 'styled-components/macro';
import { CgCheckO } from 'react-icons/cg';
import { RiFileCopyLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { device } from 'utils/breakpoints';

const fadeIn = keyframes`
from {
    opacity: 0%;
}

to { 
    opacity: 100%
}
`;

export const CartCompleteOrderId = styled.p`
	margin: 1rem 0;
	font-size: 2.4rem;

	display: inline;

	@media ${device.mobileL} {
		font-size: 2rem;
	}
`;

export const CartCompleteOrderContainer = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 0 1rem;
	padding-right: 0;
	position: relative;

	display: inline-block;
`;

export const ShowCopyMessage = styled.span`
	position: absolute;
	top: -3rem;
	right: 0;
	font-size: 1.2rem;
	padding: 0.5rem;
	background-color: var(--color-primary);
	border-radius: 5px;
	color: white;
	opacity: 100%;
	animation: ${fadeIn} 0.1s ease-in;
`;

export const CopyIconContainer = styled.span`
	display: block;
	height: 100%;
	height: 5rem;
	padding: 1rem;
	margin-left: 1rem;
	border-left: 1px solid rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: all 0.2s;
	display: inline;
	display: inline-flex;

	&:hover {
		background-color: #65ff6578;
	}

	&:active {
		background-color: #fff;
	}
`;

export const CopyIcon = styled(RiFileCopyLine)`
	font-size: 2.4rem;
`;

export const CartCompleteContainer = styled.div`
	max-width: 50rem;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const CartCompleteIcon = styled(CgCheckO)`
	font-size: 24rem;
	color: var(--color-primary);
	margin-bottom: 1rem;

	@media ${device.mobileL} {
		font-size: 16rem;
	}
`;

export const CartCompleteNote = styled.p`
	margin: 2rem 0;
	text-align: center;
	font-size: 1.6rem;
`;

export const CartCompleteLink = styled(Link)``;
