import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { gsap } from 'gsap';

import {
	ModalContainer,
	ModalOverlay,
	ModalContent,
} from './ModalElements';

//only for testing
const Modal = ({ open, children, item, setOpen }) => {
	const modalOverlayRef = useRef();
	const modalContentRef = useRef();
	const el = useRef();
	const tl = React.useRef(null);

	let rotator = null;

	useEffect(() => {
		tl.current = gsap
			.timeline({ paused: true })
			.to(rotator, {
				opacity: 1,
				y: -110,
				duration: 0.1,
				ease: 'expo.out',
			})
			.reverse(2);
	}, [tl, rotator]);

	useEffect(() => {
		console.log(open);
		if (open) {
			tl.current.play();
		} else {
			tl.current.reverse();
		}
	}, [open]);
	// useEffect(() => {
	//     tl.play
	// }, [input])

	// if (!open) return null;

	// let modalVeil = null;
	// let moda

	return ReactDOM.createPortal(
		<ModalContainer ref={el} className={open ? 'show' : ''}>
			<ModalOverlay
				ref={modalOverlayRef}
				onClick={() => {
					setOpen((currOpen) => !currOpen);
				}}
			/>
			<ModalContent ref={(e) => (rotator = e)}>
				{children}
			</ModalContent>
		</ModalContainer>,
		document.getElementById('portal')
	);
};

export default Modal;
