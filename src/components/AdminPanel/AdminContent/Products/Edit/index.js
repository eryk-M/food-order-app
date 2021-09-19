import React, { useState, useRef } from 'react';

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

import { MinusIcon } from 'components/AdminPanel/Icons';

import {
	SelectForm,
	SelectLabel,
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

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getOneProduct } from 'utils/firebaseGetters';

import Button from 'components/Button';

import { storage } from 'firebase';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Edit = (props) => {
	const { data, loading } = useFirestoreQuery(
		getOneProduct(Number(props.match.params.id))
	);
	const [ingredients, setIngredients] = useState([]);
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
	const [ingredientToAdd, setIngredientToAdd] = useState('');

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.test('name', 'Name must be at least 3 characters', (value) =>
				value ? value.length > 3 : true
			)
			.max(20, 'Name must have maximum of 20 characters'),
		price: Yup.number().test(
			'price',
			'Format: e.g. 11.00, 12.99',
			(value) => (value + '').match(/^\d*\.{1}\d*$/)
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

	const onSubmit = (data) => console.log(data);

	const removeFromIngredients = (index) => {
		let ings = ingredients.filter((el, i) => i !== index);
		setIngredients(ings);
	};

	const addToIngredients = () => {
		let ings = [...ingredients, ingredientToAdd];
		setIngredients(ings);
		setIngredientToAdd('');
	};

	return (
		<>
			{data && (
				<EditContainer>
					<EditHeading>{data[0].name}</EditHeading>
					<EditImageWrapper>
						<EditImage src={data[0].img} />
					</EditImageWrapper>

					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormElement>
							<FormLabel>Select image</FormLabel>
							<FormInput {...register('file')} type="file" />
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
										// type="number"
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

						<FormButton type="submit" text="Update" />
					</Form>
				</EditContainer>
			)}
		</>
	);
};

export default Edit;
