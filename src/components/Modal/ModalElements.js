import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 5006;
	justify-content: center;
	align-items: center;
	display: flex;
`;

export const ModalOverlay = styled(motion.div)`
	position: absolute;
	z-index: 5005;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.32);
`;

export const ModalContent = styled(motion.div)`
	background-color: #fff;
	z-index: 5006;
	display: flex;
	flex-direction: column;
	position: relative;
	border-radius: 10px;
	box-shadow: 0 0.2rem 0.3rem 0 rgba(60, 64, 67, 0.3),
		0 0.6rem 1rem 0.4rem rgba(60, 64, 67, 0.15);
`;
