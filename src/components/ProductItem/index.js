import React, { useState, useContext, useEffect } from 'react';

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
	ProductStarIcons,
	ProductRating,
	ProductPrice,
} from './ProductItemElements';

import { Alert } from '../Alert';
import Loader from 'components/Loader';
import { CartContext } from 'contexts/CartContext';
import StarRating from '../Reviews/FormReview/StarRating';

import Reviews from '../Reviews';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getOneProduct } from 'utils/firebaseGetters';

const ProductItem = ({ props }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);
	const { data, loading } = useFirestoreQuery(
		getOneProduct(Number(props.match.params.id))
	);

	const [currentItem, setCurrentItem] = useState();
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);
	if (
		(!currentItem && data) ||
		(data instanceof Array &&
			data[0].ratingCount !== currentItem.ratingCount)
	) {
		setCurrentItem(data[0]);
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

	const addZeroes = (num) => {
		const dec = num.toString().split('.')[1];
		if (!dec) return num;
		const len = dec.length > 0 ? 1 : 0;
		return Number(num).toFixed(len);
	};

	return (
		<>
			{loading && <Loader margincenter veryhigh primary />}
			{currentItem && (
				<>
					<ProductContainer>
						<ProductLeft>
							<ProductImg src={currentItem.img} />
						</ProductLeft>

						<ProductRight>
							<ProductTitle>{currentItem.name}</ProductTitle>
							{currentItem.discountPrice !== 0 && (
								<ProductPrice>
									${currentItem.discountPrice}
								</ProductPrice>
							)}
							<ProductPrice
								discount={currentItem.discountPrice !== 0}
							>
								${currentItem.price}
							</ProductPrice>
							<ProductStarIcons>
								<StarRating
									rating={currentItem.avgRating.toFixed()}
									show
								/>
							</ProductStarIcons>
							<ProductRating>
								{addZeroes(currentItem.avgRating)}
								/5 ({currentItem.ratingCount} ratings)
							</ProductRating>
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
									<Alert top="-5rem" right="0" success>
										Product added to cart
									</Alert>
								)}
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
					<Reviews productId={currentItem.id} />
				</>
			)}
		</>
	);
};

export default ProductItem;
