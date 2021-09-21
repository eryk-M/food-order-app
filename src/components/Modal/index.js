import React from 'react';
import ReactDOM from 'react-dom';

import {
	ModalContainer,
	ModalClose,
	ModalLeft,
	ModalImg,
	ModalRight,
	ModalTitle,
	ModalDesc,
	ModalIngredients,
	ModalButton,
	ModalIngredientsItem,
	ModalCartIcon,
	ModalForm,
	ModalQuantity,
	ModalQuantityLabel,
} from './ModalElements';

//only for testing
const Modal = ({ open, children, onClose, item }) => {
	if (!open) return null;
	return ReactDOM.createPortal(
		<ModalContainer>
			<ModalClose onClick={onClose}>X</ModalClose>
			{/* <ModalLeft></ModalLeft>
			<ModalImg src={item.img} />
			<ModalRight>
				<ModalTitle>{item.name}</ModalTitle>
				<ModalDesc>{item.desc}</ModalDesc>
				<ModalIngredients>
					{item.ingredients.map((el) => (
						<ModalIngredientsItem>{el}</ModalIngredientsItem>
					))}
				</ModalIngredients>
				<ModalForm>
					<ModalQuantityLabel htmlFor="quantity">
						Quantity:
					</ModalQuantityLabel>
					<ModalQuantity name="quantity" type="number" />
					<ModalButton>
						<ModalCartIcon />
						{item.button}
					</ModalButton>
				</ModalForm>
			</ModalRight> */}
			{children}
		</ModalContainer>,
		document.getElementById('portal')
	);
};

export default Modal;
