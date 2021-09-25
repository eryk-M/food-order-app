import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

export const ListInfoNote = styled.p`
	font-size: 1.8rem;
	margin-bottom: 2rem;
	font-weight: 100;
`;

export const ListDialogBox = styled(motion.div)`
	display: flex;
	background-color: #ffe9e9;
	padding: 2rem;
	align-items: center;
`;

export const ListDialogBoxNote = styled.p`
	font-size: 1.8rem;
	font-weight: 100;
`;
