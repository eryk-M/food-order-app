import React from 'react';
import ReactDOM from 'react-dom';

import {
	ModalContainer,
	ModalOverlay,
	ModalContent,
} from './ModalElements';

//only for testing
const Modal = ({ open, children, item, setOpen }) => {
	if (!open) return null;
	return ReactDOM.createPortal(
		<ModalContainer>
			<ModalOverlay
				onClick={() => {
					setOpen((currOpen) => !currOpen);
				}}
			/>
			<ModalContent>{children}</ModalContent>
		</ModalContainer>,
		document.getElementById('portal')
	);
};

export default Modal;
