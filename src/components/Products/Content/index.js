import React from 'react';

import {
	ContentContainer,
	ContentItem,
	ContentItemImage,
	ContentItemInfo,
	ContentItemHeading,
	ContentItemDesc,
	ContentItemButton,
	ContentItemPrice,
} from './ContentElements';

import {
	ProductButton,
	ProductCartIcon,
} from 'components/ProductItem/ProductItemElements';

import { Link } from 'react-router-dom';

import StarRating from 'components/Reviews/FormReview/StarRating';

import img from 'images/burger-chicken_cut.jpg';

const Content = () => {
	return (
		<ContentContainer>
			<ContentItem>
				<Link to={`/product/1`}>
					<ContentItemImage src={img} />
				</Link>
				<ContentItemInfo>
					<Link to={`/product/1`}>
						<ContentItemHeading>Burger Classic</ContentItemHeading>
					</Link>
					<ContentItemPrice>$14.99</ContentItemPrice>
					<StarRating rating={4} size={15} show />
					<ContentItemDesc>
						Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
						ipsum lorem ipsum Lorem ipsum lorem ipsum
					</ContentItemDesc>
					<ContentItemButton>
						<ProductButton>
							<ProductCartIcon />
							Add to cart
						</ProductButton>
					</ContentItemButton>
				</ContentItemInfo>
			</ContentItem>
			<ContentItem>
				<Link to={`/product/1`}>
					<ContentItemImage src={img} />
				</Link>
				<ContentItemInfo>
					<Link to={`/product/1`}>
						<ContentItemHeading>Burger Classic</ContentItemHeading>
					</Link>
					<ContentItemPrice>$14.99</ContentItemPrice>
					<StarRating rating={4} size={15} show />
					<ContentItemDesc>
						Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
						ipsum lorem ipsum Lorem ipsum lorem ipsum
					</ContentItemDesc>
					<ContentItemButton>
						<ProductButton>
							<ProductCartIcon />
							Add to cart
						</ProductButton>
					</ContentItemButton>
				</ContentItemInfo>
			</ContentItem>
			<ContentItem>
				<Link to={`/product/1`}>
					<ContentItemImage src={img} />
				</Link>
				<ContentItemInfo>
					<Link to={`/product/1`}>
						<ContentItemHeading>Burger Classic</ContentItemHeading>
					</Link>
					<ContentItemPrice>$14.99</ContentItemPrice>
					<StarRating rating={4} size={15} show />
					<ContentItemDesc>
						Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
						ipsum lorem ipsum Lorem ipsum lorem ipsum
					</ContentItemDesc>
					<ContentItemButton>
						<ProductButton>
							<ProductCartIcon />
							Add to cart
						</ProductButton>
					</ContentItemButton>
				</ContentItemInfo>
			</ContentItem>
			<ContentItem>
				<Link to={`/product/1`}>
					<ContentItemImage src={img} />
				</Link>
				<ContentItemInfo>
					<Link to={`/product/1`}>
						<ContentItemHeading>Burger Classic</ContentItemHeading>
					</Link>
					<ContentItemPrice>$14.99</ContentItemPrice>
					<StarRating rating={4} size={15} show />
					<ContentItemDesc>
						Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
						ipsum lorem ipsum Lorem ipsum lorem ipsum
					</ContentItemDesc>
					<ContentItemButton>
						<ProductButton>
							<ProductCartIcon />
							Add to cart
						</ProductButton>
					</ContentItemButton>
				</ContentItemInfo>
			</ContentItem>
			<ContentItem>
				<Link to={`/product/1`}>
					<ContentItemImage src={img} />
				</Link>
				<ContentItemInfo>
					<Link to={`/product/1`}>
						<ContentItemHeading>Burger Classic</ContentItemHeading>
					</Link>
					<ContentItemPrice>$14.99</ContentItemPrice>
					<StarRating rating={4} size={15} show />
					<ContentItemDesc>
						Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
						ipsum lorem ipsum Lorem ipsum lorem ipsum
					</ContentItemDesc>
					<ContentItemButton>
						<ProductButton>
							<ProductCartIcon />
							Add to cart
						</ProductButton>
					</ContentItemButton>
				</ContentItemInfo>
			</ContentItem>
		</ContentContainer>
	);
};

export default Content;
