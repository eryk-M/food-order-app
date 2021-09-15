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

import { CartContext } from 'contexts/CartContext';
import { useApi } from 'contexts/APIContext';
import StarRating from '../Reviews/FormReview/StarRating';

import Reviews from '../Reviews';

import { db } from 'firebase';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';

const ProductItem = ({ props }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);
	const { data } = useFirestoreQuery(
		db.collection('reviews').doc(props.match.params.id)
	);

	const { getOneProduct } = useApi();
	const [currentItem, setCurrentItem] = useState();
	const [ratings, setRatings] = useState();
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);

	useEffect(() => {
		if (data) {
			setRatings(data);
		}
		return () => {
			setRatings();
		};
	}, [data]);

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

	const addZeroes = (num) => {
		const dec = num.toString().split('.')[1];
		if (!dec) return num;
		const len = dec.length > 0 ? 1 : 0;
		return Number(num).toFixed(len);
	};

	return (
		<>
			{currentItem && (
				<>
					<ProductContainer>
						<ProductLeft>
							<ProductImg src={currentItem.img} />
						</ProductLeft>

						<ProductRight>
							<ProductTitle>{currentItem.name}</ProductTitle>
							<ProductPrice>${currentItem.price}</ProductPrice>
							<ProductStarIcons>
								<StarRating
									rating={ratings ? ratings.avgRating.toFixed() : 0}
									show
								/>
							</ProductStarIcons>
							<ProductRating>
								{ratings ? addZeroes(ratings.avgRating) : '0'}
								/5 ({ratings ? ratings.ratingCount : '0'} ratings)
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
									<Alert success>Product added to cart</Alert>
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
					<Reviews
						setRatings={setRatings}
						productId={currentItem.id}
					/>
				</>
			)}
		</>
	);
};

export default ProductItem;
