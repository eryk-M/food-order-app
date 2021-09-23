import React, { useState, useEffect } from 'react';

import Modal from 'components/Modal';

import {
	DeleteQuestionContainer,
	DeleteQuestionH1,
	DeleteQuestionP,
	DeleteBody,
	DeleteElement,
	DeleteActions,
} from './DeleteElements';

import { FormInput, FormError } from 'components/Form/FormElements';

import Button from 'components/Button';
import Loader from 'components/Loader';

import { AlertIcon } from 'components/AdminPanel/Icons';
import { useAdminApi } from 'contexts/AdminAPIContext';

const Delete = ({ setOpen, open, id, setShowSuccess }) => {
	const { deleteAdminProduct } = useAdminApi();
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
			setError('ID is required');
		} else if (inputValue !== String(id) && isInitiallyChanged) {
			setError("You didn't enter the product ID correctly");
		} else {
			setError('');
		}
	}, [inputValue, setError, id, isInitiallyChanged]);

	const handleDelete = async () => {
		try {
			setLoading(true);
			await deleteAdminProduct(id);
			handleCancel();
			setLoading(false);
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 3000);
		} catch {}
	};

	const handleCancel = () => {
		setError('');
		setInputValue('');
		console.log(open);
		setOpen(false);
		setIsInitiallyChanged(false);
	};
	return (
		<Modal open={open} setOpen={setOpen}>
			<DeleteQuestionContainer>
				<DeleteQuestionH1>
					<AlertIcon />
					Delete this product?
				</DeleteQuestionH1>
				<DeleteQuestionP>
					Are you sure you want to delete this product? Doing so will
					permamently delete the data.
				</DeleteQuestionP>
			</DeleteQuestionContainer>
			<DeleteBody>
				<DeleteElement>Product ID</DeleteElement>
				<DeleteElement>
					<strong>{id}</strong>
				</DeleteElement>
				<DeleteElement>
					Confirm you want to delete this product by typing its ID:{' '}
					<strong>{id}</strong>
				</DeleteElement>
				<DeleteElement>
					<FormInput
						value={inputValue}
						onChange={(e) => handleChange(e)}
						placeholder={id}
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
					disabled={loading || inputValue !== String(id)}
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
