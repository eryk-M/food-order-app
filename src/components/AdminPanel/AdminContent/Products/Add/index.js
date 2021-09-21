import React, { useState } from 'react';

import {
	EditContainer,
	ProgressContainer,
} from 'components/AdminPanel/Containers';

import { Line } from 'rc-progress';

import {
	EditImage,
	IngredientList,
	IngredientItem,
} from '../Edit/EditElements';

import { AdminPanelHeading } from 'components/Typography';

import Button from 'components/Button';

import { PlusBigIcon, MinusIcon } from 'components/AdminPanel/Icons';
import { useHistory } from 'react-router-dom';
import { Alert } from 'components/Alert';
import { storage } from 'firebase';

import { useAdminApi } from 'contexts/AdminAPIContext';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
	FormCheckbox,
	FormError,
	FormTextArea,
} from 'components/Form/FormElements';

import {
	SelectContent,
	SelectOption,
} from 'components/FilterGroup/Select/SelectElements';

const Add = () => {
	const { addAdminProduct } = useAdminApi();
	const history = useHistory();

	const [ingredients, setIngredients] = useState([]);
	const [ingredientToAdd, setIngredientToAdd] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [imageURI, setImageURI] = useState(null);
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const FILE_SIZE = 5242880;
	const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

	//TODO: Ingredients capitalize

	const validationSchema = Yup.object().shape({
		dummy: Yup.string(),
		file: Yup.mixed()
			.test('file', 'File is required', (value) =>
				value.length ? true : false
			)
			.test('fileSize', 'File too large. Max 5 MB', (value) => {
				if (!value.length) return true;
				return value[0].size <= FILE_SIZE;
			})
			.test(
				'fileFormat',
				'Unsupported file type. Only images in jpeg or png.',
				(value) => {
					if (!value.length) return true;
					return SUPPORTED_FORMATS.includes(value[0].type);
				}
			),
		ingredients: Yup.mixed().when('dummy', {
			is: (value) => ingredients.length === 0,
			then: Yup.string().test(
				'ingredients',
				'Add minimum 1 ingredient',
				(value) => false
			),
		}),
		name: Yup.string()
			.required('Name is required')
			.min(3, 'Name must be at least 3 characters')
			.trim()
			.max(20, 'Name must have maximum of 20 characters'),
		description: Yup.string()
			.required('Description is required')
			.min(10, 'Description must be at least 10 characters')
			.trim()
			.max(200, 'Maximum of 200 characters'),
		price: Yup.string()
			.required('Price is required')
			.trim()
			.test('price', 'Format: e.g. 11.00, 12.99', (value) =>
				(value + '').match(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/)
			),
		discount: Yup.string()
			.trim()
			.test('discount', 'Value from 0 - 99', (value) =>
				value
					? value >= 0 && value < 100 && /[0-9]/.test(value)
					: true
			),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema) });

	const removeFromIngredients = (index) => {
		let ings = ingredients.filter((el, i) => i !== index);
		setIngredients(ings);
	};

	const addToIngredients = () => {
		let ings = [...ingredients, ingredientToAdd];
		setIngredients(ings);
		setIngredientToAdd('');
	};

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const fileDataRef = storage.ref(`images/${data.file[0].name}`);
			await fileDataRef.put(data.file[0]).on(
				'state_changed',
				await function progress(snapshot) {
					let percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadPercentage(percentage);
				}
			);
			const imageSrc = await fileDataRef.getDownloadURL();

			await addAdminProduct(data, imageSrc, ingredients);
			setShowSuccess(true);
			setTimeout(() => {
				setIsLoading(false);
				history.push('/admin/products');
			}, 3000);
		} catch (err) {
			console.error(err);
		}
	};

	const checkKeyDown = (e) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			addToIngredients();
		}
	};

	const buildImgTag = () => {
		let imgTag = null;
		if (imageURI !== null)
			imgTag = <EditImage alt="Temporary image" src={imageURI} />;
		return imgTag;
	};

	const readURI = (e) => {
		if (e.target.files && e.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => setImageURI(e.target.result);
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleChangeFile = (e) => {
		readURI(e);
	};

	const imgTag = buildImgTag();

	return (
		<EditContainer>
			<PlusBigIcon />
			{showSuccess && (
				<Alert right="1rem" top="1rem" success>
					Product added
				</Alert>
			)}
			<AdminPanelHeading>Add product</AdminPanelHeading>
			<Form
				onKeyDown={(e) => checkKeyDown(e)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormElement>
					{imgTag}
					{uploadPercentage > 0 && (
						<ProgressContainer>
							<Line
								percent={`${uploadPercentage}`}
								strokeWidth="1"
								strokeColor="#60dc64"
							/>
						</ProgressContainer>
					)}
					<FormLabel className="file-label" htmlFor="file">
						Select image
					</FormLabel>
					<FormInput
						id="file"
						{...register('file')}
						type="file"
						accept="image/jpeg, image/png"
						onChange={(e) => handleChangeFile(e)}
					/>
					{errors.file && (
						<FormError>{errors.file.message}</FormError>
					)}
				</FormElement>
				<FormGroup flex align="center" margin="2rem 0">
					<FormLabel>Available?</FormLabel>
					<FormCheckbox
						{...register('available')}
						type="checkbox"
						defaultChecked={true}
					/>
				</FormGroup>
				<FormGroup flex justify="space-between">
					<FormGroup>
						<FormElement>
							<FormLabel>Name</FormLabel>
							<FormInput
								{...register('name')}
								type="text"
								error={errors.name}
							/>
							{errors.name && (
								<FormError>{errors.name.message}</FormError>
							)}
						</FormElement>
						<FormElement>
							<FormLabel>Category</FormLabel>
							<SelectContent
								display="block"
								width="21.3rem"
								{...register('category')}
							>
								<SelectOption value="Burgers">Burgers</SelectOption>
								<SelectOption value="Chicken">Chicken</SelectOption>
								<SelectOption value="Fries">Fries</SelectOption>
								<SelectOption value="Drinks">Drinks</SelectOption>
							</SelectContent>
						</FormElement>
					</FormGroup>
					<FormGroup>
						<FormElement>
							<FormLabel>Price</FormLabel>
							<FormInput
								{...register('price')}
								error={errors.price}
							/>
							{errors.price && (
								<FormError>{errors.price.message}</FormError>
							)}
						</FormElement>
						<FormElement>
							<FormLabel>Discount (without %)</FormLabel>
							<FormInput
								{...register('discount')}
								type="number"
								placeholder="How many percentage"
								error={errors.discount}
							/>
							{errors.discount && (
								<FormError>{errors.discount.message}</FormError>
							)}
						</FormElement>
					</FormGroup>

					<FormElement>
						<FormLabel>Ingredients</FormLabel>
						<IngredientList>
							{errors.ingredients && ingredients.length === 0 && (
								<FormError>{errors.ingredients.message}</FormError>
							)}
							{ingredients.map((el, i) => (
								<IngredientItem key={i}>
									{el}
									<MinusIcon
										onClick={() => removeFromIngredients(i)}
									/>
								</IngredientItem>
							))}
						</IngredientList>
						<FormInput
							value={ingredientToAdd}
							onChange={(e) => setIngredientToAdd(e.target.value)}
							display="inline"
							width="20rem"
						/>
						<Button
							type="button"
							marginleft="2rem"
							onClick={(e) => addToIngredients(e)}
						>
							Add
						</Button>
					</FormElement>
				</FormGroup>
				<FormElement>
					<FormLabel>Description</FormLabel>
					<FormTextArea
						{...register('description')}
						error={errors.description}
					/>
					{errors.description && (
						<FormError>{errors.description.message}</FormError>
					)}
				</FormElement>

				<FormButton loading={isLoading} type="submit" text="Add" />
			</Form>
		</EditContainer>
	);
};

export default Add;