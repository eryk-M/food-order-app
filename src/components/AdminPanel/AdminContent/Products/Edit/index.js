import React, { useState } from 'react';

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

import {
	EditImage,
	EditImageWrapper,
	IngredientList,
	IngredientItem,
} from './EditElements';

import { AdminPanelHeading } from 'components/Typography';

import {
	EditContainer,
	ProgressContainer,
} from 'components/AdminPanel/Containers';
import { MinusIcon, EditBigIcon } from 'components/AdminPanel/Icons';

import Button from 'components/Button';

import { Line } from 'rc-progress';
import { Alert } from 'components/Alert';
import { storage } from 'firebase';
import { capitalizeEachWord } from 'utils/capitalizeEachWord';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';

import { useAdminApi } from 'contexts/AdminAPIContext';
import { getAdminOneProduct } from 'utils/firebaseGetters';

const Edit = (props) => {
	const { data } = useFirestoreQuery(
		getAdminOneProduct(Number(props.match.params.id))
	);
	const { updateAdminProduct } = useAdminApi();

	const [ingredients, setIngredients] = useState([]);
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
	const [ingredientToAdd, setIngredientToAdd] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [imageURI, setImageURI] = useState(null);
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const FILE_SIZE = 5242880;
	const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

	const validationSchema = Yup.object().shape({
		dummy: Yup.string(),
		file: Yup.mixed()
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
			.test('name', 'Name must be at least 3 characters', (value) =>
				value ? value.length > 3 : true
			)
			.trim()
			.max(20, 'Name must have maximum of 20 characters'),
		description: Yup.string()
			.test(
				'description',
				'Description must be at least 10 characters',
				(value) => (value ? value.length >= 10 : true)
			)
			.trim()
			.max(200, 'Maximum of 200 characters'),
		price: Yup.number().test(
			'price',
			'Format: e.g. 11.00, 12.99',
			(value) =>
				(value + '').match(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/)
		),
		discount: Yup.string().test(
			'discount',
			'Value from 0 - 99',
			(value) =>
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

	if (ingredients.length === 0 && data && !isInitiallyFetched) {
		setIngredients(data[0].ingredients);
		setIsInitiallyFetched(true);
	}

	const removeFromIngredients = (index) => {
		let ings = ingredients.filter((el, i) => i !== index);
		setIngredients(ings);
	};

	const addToIngredients = () => {
		if (!ingredientToAdd.replace(/\s/g, '').length) return;
		let ings = [
			...ingredients,
			capitalizeEachWord(ingredientToAdd).trim(),
		];
		setIngredients(ings);
		setIngredientToAdd('');
	};

	const onSubmit = async (data) => {
		let imageSrc;
		setIsLoading(true);
		if (data.file.length !== 0) {
			let imageId = '';
			for (let i = 0; i < 12; i++) {
				let rndInt = Math.floor(Math.random() * 9) + 1;
				imageId += rndInt;
			}
			const fileDataRef = storage.ref(`images/${imageId}`);
			await fileDataRef.put(data.file[0]).on(
				'state_changed',
				function progress(snapshot) {
					let percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadPercentage(percentage);
				},
				(error) => {
					//TODO: TODO ERRORY
				},
				async () => {
					imageSrc = await fileDataRef.getDownloadURL();
					await updateAdminProduct(
						props.match.params.id,
						data,
						ingredients,
						imageSrc
					);
					setShowSuccess(true);
					setTimeout(() => {
						setIsLoading(false);
						setShowSuccess(false);
						setUploadPercentage(0);
					}, 3000);
				}
			);
		} else {
			await updateAdminProduct(
				props.match.params.id,
				data,
				ingredients,
				imageSrc
			);
			setShowSuccess(true);
			setTimeout(() => {
				setIsLoading(false);
				setShowSuccess(false);
				setUploadPercentage(0);
			}, 3000);
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
		<>
			{data && (
				<EditContainer>
					<EditBigIcon />
					{showSuccess && (
						<Alert right="1rem" top="1rem" success>
							Product updated
						</Alert>
					)}
					<AdminPanelHeading>{data[0].name}</AdminPanelHeading>
					{imgTag || (
						<EditImageWrapper>
							<EditImage src={data[0].img} />
						</EditImageWrapper>
					)}
					{uploadPercentage > 0 && (
						<ProgressContainer>
							<Line
								percent={`${uploadPercentage}`}
								strokeWidth="1"
								strokeColor="#60dc64"
							/>
						</ProgressContainer>
					)}
					<Form
						onKeyDown={(e) => checkKeyDown(e)}
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormElement>
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
								defaultChecked={data[0].availability}
							/>
						</FormGroup>
						<FormGroup flex justify="space-between">
							<FormGroup>
								<FormElement>
									<FormLabel>Name</FormLabel>
									<FormInput
										{...register('name')}
										type="text"
										defaultValue={data[0].name}
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
										defaultValue={data[0].category}
									>
										<SelectOption value="Burgers">
											Burgers
										</SelectOption>
										<SelectOption value="Chicken">
											Chicken
										</SelectOption>
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
										defaultValue={data[0].price}
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
										defaultValue={data[0].discountPrice}
										type="number"
										placeholder="How many percentage"
										error={errors.discount}
									/>
									{errors.discount && (
										<FormError>{errors.discount.message}</FormError>
									)}
								</FormElement>
							</FormGroup>

							<FormElement marginleft="2rem">
								<FormLabel>Ingredients</FormLabel>
								<IngredientList>
									{errors.ingredients && ingredients.length === 0 && (
										<FormError>
											{errors.ingredients.message}
										</FormError>
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
									display="block"
									width="100%"
									type="button"
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
								defaultValue={data[0].desc}
								error={errors.description}
							/>
							{errors.description && (
								<FormError>{errors.description.message}</FormError>
							)}
						</FormElement>

						<FormButton
							loading={isLoading}
							type="submit"
							text="Update"
						/>
					</Form>
				</EditContainer>
			)}
		</>
	);
};

export default Edit;
