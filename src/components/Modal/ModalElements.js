import styled, { keyframes } from 'styled-components/macro';

const fadeIn = keyframes`
from {
    opacity: 0%;
    
}

to {
    opacity: 100%
}
`;

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1000;
	justify-content: center;
	align-items: center;
	display: flex;
`;

export const ModalOverlay = styled.div`
	position: absolute;
	z-index: 1000;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.32);
	opacity: 100%;
	animation: ${fadeIn} 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const ModalContent = styled.div`
	background-color: #fff;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	position: relative;
	border-radius: 10px;
	box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
		0 6px 10px 4px rgba(60, 64, 67, 0.15);
`;
