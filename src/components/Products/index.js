import React from 'react';

import {
	ProductsContainer,
	ProductsHeading,
	ProductsFilter,
	ProductsOption,
	ProductsWrapper,
	ProductsCard,
	ProductsImg,
	ProductsTitle,
	ProductsDesc,
	ProductsPrice,
	ProductsButton,
} from './ProductsElements';

import Image1 from '../../images/burger-chicken.jpg';
import Image2 from '../../images/burger-double.jpg';
import Image3 from '../../images/burger-classic.jpg';

const Products = () => {
	return (
		<ProductsContainer>
			<ProductsHeading>Our menu</ProductsHeading>
			<ProductsFilter>
				<ProductsOption>All</ProductsOption>
				<ProductsOption>Burgers</ProductsOption>
				<ProductsOption>Chicken</ProductsOption>
			</ProductsFilter>
			<ProductsWrapper>
				{/* item */}
				<ProductsCard>
					<ProductsImg src={Image1} />
					<ProductsTitle>Chicken Burger</ProductsTitle>
					<ProductsDesc>
						Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
						ipsum Lorem ipsum
					</ProductsDesc>
					<ProductsPrice>$10.00</ProductsPrice>
					<ProductsButton>Order</ProductsButton>
				</ProductsCard>
				{/* item */}
				{/* item */}
				<ProductsCard>
					<ProductsImg src={Image2} />
					<ProductsTitle>Chicken Burger</ProductsTitle>
					<ProductsDesc>
						Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
						ipsum Lorem ipsum
					</ProductsDesc>
					<ProductsPrice>$10.00</ProductsPrice>
					<ProductsButton>Order</ProductsButton>
				</ProductsCard>
				{/* item */}
				{/* item */}
				<ProductsCard>
					<ProductsImg src={Image3} />
					<ProductsTitle>Chicken Burger</ProductsTitle>
					<ProductsDesc>
						Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
						ipsum Lorem ipsum
					</ProductsDesc>
					<ProductsPrice>$10.00</ProductsPrice>
					<ProductsButton>Order</ProductsButton>
				</ProductsCard>
				{/* item */}
			</ProductsWrapper>
		</ProductsContainer>
	);
};

export default Products;
