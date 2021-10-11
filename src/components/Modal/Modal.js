import React from 'react';
import ReactDOM from 'react-dom';

import { AnimatePresence } from 'framer-motion';

import {
	ModalContainer,
	ModalOverlay,
	ModalContent,
} from './ModalElements';

export const Modal = ({ open, children, item, setOpen }) => {
	return ReactDOM.createPortal(
		<AnimatePresence>
			{open && (
				<ModalContainer>
					<ModalOverlay
						initial={{ opacity: 0, transition: { duration: 0.3 } }}
						animate={{ opacity: 1, transition: { duration: 0.3 } }}
						exit={{ opacity: 0 }}
						onClick={() => {
							setOpen((currOpen) => !currOpen);
						}}
					/>
					<ModalContent
						initial={{
							opacity: 0,
							y: -100,
							transition: { duration: 0.3 },
						}}
						animate={{
							opacity: 1,
							y: 0,
							transition: { duration: 0.1 },
						}}
						exit={{
							opacity: 0,
							y: -100,
							transition: { duration: 0.1 },
						}}
					>
						{children}
					</ModalContent>
				</ModalContainer>
			)}
		</AnimatePresence>,
		document.getElementById('portal')
	);
};
