import React, { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
	ItemImage,
	ItemWrapper,
	ItemInfo,
	ItemHeading,
	ItemDesc,
	ItemButton,
	ItemPrice,
	ItemImageWrapper,
} from './ItemElements';

import {
	ProductButton,
	ProductCartIcon,
} from 'components/ProductItem/ProductItemElements';

import { Alert } from 'components/Alert';
import { CartContext } from 'contexts/CartContext';

import LazyLoad from 'react-lazyload';
import StarRating from 'components/Reviews/FormReview/StarRating';

const Item = ({ el }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const [isAdded, setIsAdded] = useState(false);

	//TODO: WARTO WRZUCIC TO DO WSPOLNEJ FUNKCJI ... /helpers??
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	async function addToCart(e) {
		e.preventDefault();
		await dispatch({
			type: 'ADD_TO_CART',
			payload: el,
		});
		setIsAdded(true);
		setTimeout(() => {
			setIsAdded(false);
		}, 4000);
	}

	return (
		<ItemWrapper>
			{isAdded && <Alert success>Product added to cart</Alert>}

			<ItemImageWrapper>
				<Link to={`/product/${el.id}`}>
					<LazyLoad offset={100}>
						<ItemImage src={el.img} alt={el.alt} />
					</LazyLoad>
				</Link>
			</ItemImageWrapper>
			<ItemInfo>
				<Link to={`/product/${el.id}`}>
					<ItemHeading>{el.name}</ItemHeading>
				</Link>
				<ItemPrice>${el.price}</ItemPrice>
				<StarRating rating={el.avgRating} size={15} show />
				<ItemDesc>{el.desc}</ItemDesc>
				<ItemButton>
					<ProductButton
						disabled={isAdded}
						onClick={(e) => addToCart(e)}
					>
						<ProductCartIcon />
						Add to cart
					</ProductButton>
				</ItemButton>
			</ItemInfo>
		</ItemWrapper>
	);
};

export default Item;
