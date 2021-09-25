import React, { useState, useEffect } from 'react';

import Modal from 'components/Modal';

import {
	DeleteQuestionContainer,
	DeleteQuestionH1,
	DeleteQuestionP,
	DeleteBody,
	DeleteElement,
	DeleteActions,
} from 'components/AdminPanel/AdminContent/Products/Delete/DeleteElements';

import { FormInput, FormError } from 'components/Form/FormElements';

import Button from 'components/Button';
import Loader from 'components/Loader';

import { AlertIcon } from 'components/AdminPanel/Icons';
// import { useAdminApi } from 'contexts/AdminAPIContext';

const Delete = ({
	setOpen,
	open,
	amountToDelete,
	setShowSuccess,
}) => {
	// const { deleteAdminOrders } = useAdminApi();
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [isInitiallyChanged, setIsInitiallyChanged] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = async (e) => {
		setInputValue(e.target.value);
		setIsInitiallyChanged(true);
	};

	useEffect(() => {
		setError('');
		if (inputValue === '' && isInitiallyChanged) {
			setError('Number is required');
		} else if (
			inputValue !== String(amountToDelete) &&
			isInitiallyChanged
		) {
			setError("You didn't enter the number correctly");
		} else {
			setError('');
		}
	}, [inputValue, setError, amountToDelete, isInitiallyChanged]);

	const handleDelete = async () => {
		try {
			setLoading(true);
			// await deleteAdminOrders(itemsToDelete);
			handleCancel();
			setLoading(false);
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 5000);
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
					Delete these orders?
				</DeleteQuestionH1>
				<DeleteQuestionP>
					Are you sure you want to delete these orders? Doing so will
					permamently delete the data.
				</DeleteQuestionP>
			</DeleteQuestionContainer>
			<DeleteBody>
				<DeleteElement>Orders checked</DeleteElement>
				<DeleteElement>
					<strong>{amountToDelete}</strong>
				</DeleteElement>
				<DeleteElement>
					Confirm you want to delete these orders by typing amount:{' '}
					<strong>{amountToDelete}</strong>
				</DeleteElement>
				<DeleteElement>
					<FormInput
						value={inputValue}
						onChange={(e) => handleChange(e)}
						placeholder={amountToDelete}
						error={error}
					/>
					{error && <FormError>{error}</FormError>}
				</DeleteElement>
			</DeleteBody>

			<DeleteActions>
				{loading && <Loader primary loading={loading} />}
				<Button disabled={loading} secondary onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					disabled={loading || inputValue !== String(amountToDelete)}
					marginleft="2rem"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</DeleteActions>
		</Modal>
	);
};

export default Delete;
