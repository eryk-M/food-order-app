import React, {
	useState,
	useContext,
	useEffect,
	useRef,
} from 'react';

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
	ItemAlertWrapper,
} from './ItemElements';

import {
	ProductButton,
	ProductCartIcon,
} from 'pages/ProductItem/ProductItemElements';

import { Alert, StarRating } from 'components';
import { CartContext } from 'contexts';

import 'react-lazy-load-image-component/src/effects/opacity.css';

import { useWindowSize } from 'hooks';

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
	const { width } = useWindowSize();
	//adding timeout to remove from unmount
	const addedTimeoutRef = useRef();

	const [isAdded, setIsAdded] = useState(false);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
		return () => {
			clearTimeout(addedTimeoutRef.current);
		};
	}, []);

	const addToCart = (e) => {
		e.preventDefault();
		dispatch({
			type: 'ADD_TO_CART',
			payload: el,
		});
		setIsAdded(true);

		const timeout = setTimeout(() => {
			setIsAdded(false);
		}, 4000);
		addedTimeoutRef.current = timeout;
	};

	return (
		<ItemWrapper>
			{isAdded && width > 360 && (
				<Alert
					top={width <= 460 ? '95%' : '2rem'}
					right={width <= 460 ? '23%' : '2rem'}
					success
				>
					Product added to cart
				</Alert>
			)}
			{isAdded && width <= 360 && (
				<ItemAlertWrapper>
					<Alert success>Product added to cart</Alert>
				</ItemAlertWrapper>
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
