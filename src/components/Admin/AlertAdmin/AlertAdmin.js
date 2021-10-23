import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { AlertSuccessIcon } from 'components/Alert/AlertElements';

import { motion, AnimatePresence } from 'framer-motion';

const timeout = keyframes`
from {
    width: 0;
}

to {
    width: 100%;
}
`;

const AlertContainer = styled(motion.div)`
	background-color: #494949;
	position: absolute;
	z-index: 15;
	color: var(--color-green);
	font-size: 1.6rem;
	padding: 1.8rem 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	right: ${({ right }) => right};
	top: ${({ top }) => top};
	border-radius: 5px;
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;
		top: 93%;
		left: 0;
		background-color: var(--color-green);
		height: 4px;
		width: 100%;
		animation: ${({ showSuccess }) =>
			showSuccess
				? css`
						${timeout} 3s linear
				  `
				: ''};
	}
`;

export const AlertAdmin = ({
	showSuccess,
	resetSuccess,
	children,
	...rest
}) => {
	return (
		<AnimatePresence>
			{showSuccess && (
				<AlertContainer
					initial={{
						opacity: 0,
						x: 100,
					}}
					animate={{
						opacity: 1,
						x: 0,
					}}
					exit={{
						opacity: 0,
						x: 100,
					}}
					transition={{ type: 'spring', duration: 0.5 }}
					showSuccess={showSuccess}
					{...rest}
				>
					<AlertSuccessIcon /> {children}
				</AlertContainer>
			)}
		</AnimatePresence>
	);
};
