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
import 'react-lazy-load-image-component/src/effects/opacity.css';
import StarRating from 'components/Reviews/FormReview/StarRating';

const Image = ({ el }) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<ItemImageWrapper
			loaded={loaded}
			discount={el.discountPrice !== 0}
		>
			<Link to={`/product/${el.id}`}>
				<ItemImage
					effect="opacity"
					afterLoad={() => setLoaded(true)}
					src={el.img}
					alt={el.alt}
				/>
			</Link>
		</ItemImageWrapper>
	);
};

const Item = ({ el }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const [isAdded, setIsAdded] = useState(false);
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (e) => {
		e.preventDefault();
		dispatch({
			type: 'ADD_TO_CART',
			payload: el,
		});
		setIsAdded(true);
		setTimeout(() => {
			setIsAdded(false);
		}, 4000);
	};
	return (
		<ItemWrapper>
			{isAdded && (
				<Alert top="2rem" right="2rem" success>
					Product added to cart
				</Alert>
			)}

			<Image el={el} />
			<ItemInfo>
				<Link to={`/product/${el.id}`}>
					<ItemHeading>{el.name}</ItemHeading>
				</Link>
				<ItemPrice discount={el.discountPrice !== 0}>
					${el.price}
				</ItemPrice>
				{el.discountPrice !== 0 && (
					<ItemPrice>${el.discountPrice}</ItemPrice>
				)}
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
