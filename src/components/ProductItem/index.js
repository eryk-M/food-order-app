import React, { useState, useContext, useEffect } from 'react';

//for testing
import { dummyData } from '../Products/dummyData';

import {
	ProductContainer,
	ProductLeft,
	ProductImg,
	ProductRight,
	ProductTitle,
	ProductDesc,
	ProductIngredients,
	ProductForm,
	ProductQuantityLabel,
	ProductQuantity,
	ProductButton,
	ProductCartIcon,
	ProductIngredientsItem,
	ProductStar,
	ProductStarIcons,
	ProductRating,
	ProductPrice,
} from './ProductItemElements';

import { Alert } from '../Alert/index';

import { CartContext } from '../../contexts/CartContext';
import { useApi } from '../../contexts/APIContext';

const ProductItem = ({ props }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const { getOneProduct } = useApi();

	const [currentItem, setCurrentItem] = useState();
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);

	if (!currentItem) {
		getOneProduct(Number(props.match.params.id)).then((data) =>
			setCurrentItem(data)
		);
	}

	const onInputChange = (e) => {
		currentItem.quantity = Number(e.target.value);
		setQuantity(Number(e.target.value));
	};

	async function addToCart(e) {
		e.preventDefault();
		await dispatch({
			type: 'ADD_TO_CART',
			payload: currentItem,
		});
		setIsAdded(true);

		setTimeout(() => {
			setIsAdded(false);
		}, 4000);
	}

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	return (
		<>
			{currentItem && (
				<ProductContainer>
					{/* <ProductBackground /> */}
					<ProductLeft>
						<ProductImg src={currentItem.img} />
					</ProductLeft>

					<ProductRight>
						<ProductTitle>{currentItem.name}</ProductTitle>
						<ProductPrice>${currentItem.price}</ProductPrice>
						<ProductStarIcons>
							<ProductStar />
							<ProductStar />
							<ProductStar />
							<ProductStar />
							<ProductStar />
						</ProductStarIcons>
						<ProductRating>0/5 (0 ratings)</ProductRating>
						<ProductDesc>{currentItem.desc}</ProductDesc>
						<ProductIngredients>
							{currentItem.ingredients.map((el, i) => (
								<ProductIngredientsItem key={i}>
									{el}
								</ProductIngredientsItem>
							))}
						</ProductIngredients>

						<ProductForm onSubmit={(e) => addToCart(e)}>
							{isAdded && (
								<Alert success>Product added to cart</Alert>
							)}
							{/* <ProductAdded>
								<ProductAddedIcon /> Product added to cart
							</ProductAdded> */}
							<ProductQuantityLabel htmlFor="quantity">
								Quantity:
							</ProductQuantityLabel>
							<ProductQuantity
								name="quantity"
								type="number"
								value={quantity}
								onChange={(e) => onInputChange(e)}
								min="1"
								max="10"
								maxLength="2"
								disabled={isAdded}
							/>

							<ProductButton disabled={isAdded}>
								<ProductCartIcon />
								{currentItem.button}
							</ProductButton>
						</ProductForm>
					</ProductRight>
				</ProductContainer>
			)}
		</>
	);
};

export default ProductItem;
