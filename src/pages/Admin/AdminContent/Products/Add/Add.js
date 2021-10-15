import React, { useState, useRef, useEffect } from 'react';

import {
	EditContainer,
	ProgressContainer,
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
	FormCheckbox,
	FormError,
	FormTextArea,
	FormAlert,
	FormGroupWrapper,
	PlusBigIcon,
	MinusIcon,
	Alert,
	AdminPanelHeading,
} from 'components';

import {
	EditImage,
	IngredientList,
	IngredientItem,
	EditButton,
} from '../Edit/EditElements';

import { useHistory } from 'react-router-dom';
import { storage } from 'firebase';
import { capitalizeEachWord } from 'utils/capitalizeEachWord';
import { useAdminApi } from 'contexts';
import { useWindowSize } from 'hooks';

import {
	SelectContent,
	SelectOption,
} from 'components/FilterGroup/Select/SelectElements';

//FORM
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const Add = () => {
	const { addAdminProduct } = useAdminApi();
	const history = useHistory();
	const { width } = useWindowSize();
	const timeoutRef = useRef();

	const [ingredients, setIngredients] = useState([]);
	const [ingredientToAdd, setIngredientToAdd] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [imageURI, setImageURI] = useState(null);
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema(ingredients)),
	});

	//clearing timeout function on unmount
	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

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
		setError('');
		try {
			let imageId = '';
			for (let i = 0; i < 12; i++) {
				let rndInt = Math.floor(Math.random() * 9) + 1;
				imageId += rndInt;
			}
			setIsLoading(true);
			const fileDataRef = storage.ref(`images/${imageId}`);
			await fileDataRef.put(data.file[0]).on(
				'state_changed',
				function progress(snapshot) {
					let percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadPercentage(percentage);
				},
				(error) => {
					setError('Something went wrong. Please try again!');
				},
				async () => {
					try {
						const imageSrc = await fileDataRef.getDownloadURL();

						await addAdminProduct(data, imageSrc, ingredients);
						setShowSuccess(true);

						const timeout = setTimeout(() => {
							setIsLoading(false);
							history.push('/admin/products');
						}, 3000);
						timeoutRef.current = timeout;
					} catch {
						setIsLoading(false);
						setError('Something went wrong. Please try again!');
					}
				}
			);
		} catch (err) {
			setIsLoading(false);
			setError('Something went wrong. Please try again!');
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
		if (errors.file) return (errors.file = '');
	};

	const imgTag = buildImgTag();

	return (
		<EditContainer>
			{uploadPercentage > 0 && (
				<ProgressContainer width={uploadPercentage} />
			)}
			<PlusBigIcon />
			{showSuccess && (
				<Alert
					right={width <= 580 ? '1.5rem' : '1rem'}
					top={width <= 580 ? '70%' : '1rem'}
					success
				>
					Added
				</Alert>
			)}
			{error && <FormAlert variant="danger">{error}</FormAlert>}
			<AdminPanelHeading>Add product</AdminPanelHeading>
			<Form
				onKeyDown={(e) => checkKeyDown(e)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormElement>
					{imgTag}

					<FormLabel className="file-label" htmlFor="file">
						Select image
					</FormLabel>
					<FormInput
						id="file"
						{...register('file')}
						type="file"
						accept="image/jpeg, image/png"
						onChange={(e) => handleChangeFile(e)}
						error={errors.file}
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
				<FormGroupWrapper>
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
						<EditButton
							display="block"
							type="button"
							width="100%"
							onClick={(e) => addToIngredients(e)}
							secondary
						>
							Add
						</EditButton>
					</FormElement>
				</FormGroupWrapper>
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
