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
} from 'components/Form/FormElements';

import {
	SelectContent,
	SelectOption,
} from 'components/FilterGroup/Select/SelectElements';

import {
	EditImage,
	EditImageWrapper,
	EditHeading,
	IngredientList,
	IngredientItem,
} from './EditElements';

import { EditContainer } from 'components/AdminPanel/Containers';
import { MinusIcon } from 'components/AdminPanel/Icons';

import Button from 'components/Button';

import { Alert } from 'components/Alert';
import { storage } from 'firebase';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getOneProduct } from 'utils/firebaseGetters';

const Edit = (props) => {
	const { data, loading } = useFirestoreQuery(
		getOneProduct(Number(props.match.params.id))
	);

	const [ingredients, setIngredients] = useState([]);
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
	const [ingredientToAdd, setIngredientToAdd] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	//"image/jpeg"

	const FILE_SIZE = 5242880;
	const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

	const validationSchema = Yup.object().shape({
		dummy: Yup.string(),
		file: Yup.mixed()
			.test('fileSize', 'File too large. Max 5 MB', (value) => {
				if (!value.length) return true;
				return value[0].size <= FILE_SIZE;
				// console.log(value);
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
			.max(20, 'Name must have maximum of 20 characters'),
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
		let ings = [...ingredients, ingredientToAdd];
		setIngredients(ings);
		setIngredientToAdd('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addToIngredients();
		}
	};

	//  TODO: SKONCZYLEM TUTAJ
	const onSubmit = async (data) => {
		if (data.file.length !== 0) {
			const fileData = await storage
				.ref(`images/${data.file[0].name}`)
				.put(data.file[0]);
			const imageSrc = await fileData.ref.getDownloadURL();
			console.log(imageSrc);
		}
		console.log(data);
	};

	return (
		<>
			{data && (
				<EditContainer>
					{showSuccess && (
						<Alert right="1rem" top="1rem" success>
							Product updated
						</Alert>
					)}
					<EditHeading>{data[0].name}</EditHeading>
					<EditImageWrapper>
						<EditImage src={data[0].img} />
					</EditImageWrapper>

					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormElement>
							<FormLabel className="file-label" htmlFor="file">
								Select image
							</FormLabel>
							<FormInput
								id="file"
								{...register('file')}
								type="file"
								accept="image/jpeg, image/png"
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
								<FormElement marginleft="2rem">
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
								<FormElement marginleft="2rem">
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
									{errors.ingredients && (
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
									onKeyPress={(e) => handleKeyPress(e)}
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

						<FormButton type="submit" text="Update" />
					</Form>
				</EditContainer>
			)}
		</>
	);
};

export default Edit;
