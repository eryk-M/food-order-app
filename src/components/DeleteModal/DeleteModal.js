import React, { useState, useEffect, useRef } from 'react';

import {
	DeleteQuestionContainer,
	DeleteQuestionH1,
	DeleteQuestionP,
	DeleteBody,
	DeleteElement,
	DeleteActions,
} from './DeleteModalElements';

import {
	Loader,
	Modal,
	FormInput,
	FormError,
	AlertIcon,
	Button,
} from 'components';
export const DeleteModal = ({
	setOpen,
	open,
	input,
	toDelete,
	setShowSuccess,
	asyncFunction,
	mainText,
	secondText,
	description,
	setToDelete,
}) => {
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [isInitiallyChanged, setIsInitiallyChanged] = useState(false);
	const [loading, setLoading] = useState(false);
	const timeoutRef = useRef();

	const handleChange = async (e) => {
		setInputValue(e.target.value);
		setIsInitiallyChanged(true);
	};

	useEffect(() => {
		setError('');
		if (inputValue === '' && isInitiallyChanged) {
			setError('ID is required');
		} else if (inputValue !== String(input) && isInitiallyChanged) {
			setError("You didn't enter number correctly");
		} else {
			setError('');
		}
	}, [inputValue, setError, input, isInitiallyChanged]);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	const handleDelete = async () => {
		try {
			setLoading(true);
			await asyncFunction(toDelete);
			handleCancel();
			setLoading(false);
			setShowSuccess(true);

			if (setToDelete) {
				setToDelete(0);
			}

			const timeout = setTimeout(() => {
				setShowSuccess(false);
			}, 3000);
			timeoutRef.current = timeout;
		} catch {}
	};

	const handleCancel = () => {
		setError('');
		setInputValue('');
		setOpen(false);
		setIsInitiallyChanged(false);
	};
	return (
		<Modal open={open} setOpen={setOpen}>
			<DeleteQuestionContainer>
				<DeleteQuestionH1>
					<AlertIcon />
					{mainText}
				</DeleteQuestionH1>
				<DeleteQuestionP>
					Are you sure you want to delete {description}? Doing so will
					permamently delete the data.
				</DeleteQuestionP>
			</DeleteQuestionContainer>
			<DeleteBody>
				<DeleteElement>{secondText}</DeleteElement>
				<DeleteElement>
					<strong>{input}</strong>
				</DeleteElement>
				<DeleteElement>
					Confirm you want to delete {description} by typing:{' '}
					<strong>{input}</strong>
				</DeleteElement>
				<DeleteElement>
					<FormInput
						value={inputValue}
						onChange={(e) => handleChange(e)}
						placeholder={input}
						error={error}
					/>
					{error && <FormError>{error}</FormError>}
				</DeleteElement>
			</DeleteBody>

			<DeleteActions>
				{loading && <Loader primary marginright="2rem" />}

				<Button disabled={loading} secondary onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					disabled={loading || inputValue !== String(input)}
					marginleft="2rem"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</DeleteActions>
		</Modal>
	);
};
