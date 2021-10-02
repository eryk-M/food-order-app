import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
} from 'react';

import {
	ProductContainer,
	ProductLeft,
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
	SliderContainer,
	SliderShowcase,
	SlideShow,
	SlideItem,
	SliderSelect,
	ResizeIcon,
} from './ProductItemElements';

import { Alert } from '../Alert';
import Loader from 'components/Loader';
import { CartContext } from 'contexts/CartContext';
import StarRating from '../Reviews/FormReview/StarRating';

import Reviews from '../Reviews';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getOneProduct } from 'utils/firebaseGetters';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ProductItem = ({ props }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);
	const { data, loading } = useFirestoreQuery(
		getOneProduct(Number(props.match.params.id))
	);

	const imgRef = useRef();
	const showcaseRef = useRef(null);

	const [currentItem, setCurrentItem] = useState();
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);

	const [isLightboxOpen, setIsLigtboxOpen] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(0);
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

	const slideImage = useCallback(
		(id) => {
			if (imgRef.current && imgRef.current.clientWidth) {
				const displayWidth = imgRef.current.clientWidth;
				const translate = `translateX(-${(id - 1) * displayWidth}px)`;
				showcaseRef.current.style.transform = translate;
			}
		},
		[imgRef]
	);

	useEffect(() => {
		window.addEventListener('resize', slideImage);
		return () => {
			window.removeEventListener('resize', null);
		};
	}, [slideImage]);

	const addZeroes = (num) => {
		const dec = num.toString().split('.')[1];
		if (!dec) return num;
		const len = dec.length > 0 ? 1 : 0;
		return Number(num).toFixed(len);
	};

	const slides = [
		{ id: 1, src: currentItem?.img },
		{ id: 2, src: currentItem?.img },
		{ id: 3, src: currentItem?.img },
	];

	return (
		<>
			{loading && <Loader margincenter veryhigh primary />}
			{currentItem && (
				<>
					{isLightboxOpen && (
						<Lightbox
							mainSrc={slides[photoIndex].src}
							onCloseRequest={() =>
								setIsLigtboxOpen((prevOpen) => !prevOpen)
							}
							nextSrc={slides[(photoIndex + 1) % slides.length].src}
							prevSrc={
								slides[
									(photoIndex + slides.length - 1) % slides.length
								].src
							}
							onMovePrevRequest={() =>
								setPhotoIndex(
									(photoIndex + slides.length - 1) % slides.length
								)
							}
							onMoveNextRequest={() =>
								setPhotoIndex((photoIndex + 1) % slides.length)
							}
						/>
					)}
					<ProductContainer>
						<ProductLeft>
							<SliderContainer discount={currentItem.discountPrice}>
								<ResizeIcon />
								<SliderShowcase
									ref={showcaseRef}
									onClick={() =>
										setIsLigtboxOpen((prevOpen) => !prevOpen)
									}
								>
									<SlideShow
										ref={imgRef}
										src={currentItem.img}
										alt="Product show"
									/>
									<SlideShow
										src={currentItem.img}
										alt="Product show"
									/>
									<SlideShow
										src={currentItem.img}
										alt="Product show"
									/>
								</SliderShowcase>
								<SliderSelect>
									{slides.map((el) => (
										<SlideItem
											key={el.id}
											onClick={(e) => {
												e.preventDefault();

												slideImage(el.id);
											}}
										>
											<img src={el.src} alt="" />
										</SlideItem>
									))}
								</SliderSelect>
							</SliderContainer>
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
