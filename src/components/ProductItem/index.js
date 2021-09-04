import React, { useState, useContext } from 'react';

//for testing
import { data } from '../Products/dummyData';

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

import { CartContext } from '../../contexts/CartContext';

const ProductItem = ({ props }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const [currentItem, setCurrentItem] = useState();
	const [quantity, setQuantity] = useState(1);

	const onInputChange = (e) => {
		currentItem.quantity = Number(e.target.value);
		setQuantity(Number(e.target.value));
	};

	const addToCart = (e) => {
		e.preventDefault();
		console.log(quantity);
		dispatch({
			type: 'ADD_TO_CART',
			payload: currentItem,
		});
	};

	//testing instead of fetching
	const findItem = () => {
		const item = data.find(
			(el) => Number(props.match.params.id) === el.id
		);
		setCurrentItem(item);
	};

	if (!currentItem) findItem();
	//

	return (
		<>
			{console.log(cart)}
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
						<ProductForm>
							<ProductQuantityLabel htmlFor="quantity">
								Quantity:
							</ProductQuantityLabel>
							<ProductQuantity
								name="quantity"
								type="number"
								value={quantity}
								onChange={(e) => onInputChange(e)}
								min="1"
							/>
							<ProductButton onClick={(e) => addToCart(e)}>
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
