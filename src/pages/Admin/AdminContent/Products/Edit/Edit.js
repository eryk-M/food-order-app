import React, { useState, useRef, useEffect } from 'react';

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
	FormAlert,
	FormGroupWrapper,
	EditContainer,
	ProgressContainer,
	MinusIcon,
	EditBigIcon,
	AdminPanelHeading,
	AlertAdmin,
} from 'components';

import {
	SelectContent,
	SelectOption,
} from 'components/FilterGroup/Select/SelectElements';

import {
	EditImage,
	EditImageWrapper,
	IngredientList,
	IngredientItem,
	EditButton,
} from './EditElements';

import { storage } from 'firebase';
import { capitalizeEachWord } from 'utils/capitalizeEachWord';

import { useFirestoreQuery, useWindowSize } from 'hooks';
import { Redirect } from 'react-router';
import { useAdminApi } from 'contexts';
import { getAdminOneProduct } from 'utils/firebaseGetters';

//FORM
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const Edit = (props) => {
	const { data } = useFirestoreQuery(
		getAdminOneProduct(Number(props.match.params.id))
	);
	const { updateAdminProduct } = useAdminApi();
	const { width } = useWindowSize();
	const timeoutRef = useRef();

	const [ingredients, setIngredients] = useState([]);
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
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

	if (data?.length === 0) return <Redirect to="/admin/products" />;

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
		setError('');
		try {
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
						setError('Something went wrong. Please try again!');
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

						const timeout = setTimeout(() => {
							setIsLoading(false);
							setShowSuccess(false);
							setUploadPercentage(0);
						}, 3000);
						timeoutRef.current = timeout;
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
				const timeout = setTimeout(() => {
					setIsLoading(false);
					setShowSuccess(false);
					setUploadPercentage(0);
				}, 3000);
				timeoutRef.current = timeout;
			}
		} catch {
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
	};

	const imgTag = buildImgTag();

	const [
		{ name, img, availability, category, price, discountPrice, desc },
	] = data || [{}];
	return (
		<>
			{data && (
				<EditContainer>
					{uploadPercentage > 0 && (
						<ProgressContainer width={uploadPercentage} />
					)}
					<EditBigIcon />

					<AlertAdmin
						right={width <= 580 ? '1.5rem' : '1rem'}
						top={width <= 580 ? '70%' : '1rem'}
						showSuccess={showSuccess}
					>
						Updated
					</AlertAdmin>

					{error && <FormAlert variant="danger">{error}</FormAlert>}
					<AdminPanelHeading>{name}</AdminPanelHeading>
					{imgTag || (
						<EditImageWrapper>
							<EditImage src={img} />
						</EditImageWrapper>
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
								defaultChecked={availability}
							/>
						</FormGroup>
						<FormGroupWrapper>
							<FormGroup>
								<FormElement>
									<FormLabel>Name</FormLabel>
									<FormInput
										{...register('name')}
										type="text"
										defaultValue={name}
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
										defaultValue={category}
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
										defaultValue={price}
										error={errors.price}
									/>
									{errors.price && (
										<FormError>{errors.price.message}</FormError>
									)}
								</FormElement>
								<FormElement>
									<FormLabel>Discount price</FormLabel>
									<FormInput
										{...register('discount')}
										defaultValue={discountPrice}
										type="number"
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
								<EditButton
									display="block"
									width="100%"
									type="button"
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
								defaultValue={desc}
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
