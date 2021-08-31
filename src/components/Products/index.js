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

import Button from '../Button';

import Image1 from '../../images/burger-chicken.jpg';
import Image2 from '../../images/burger-double.jpg';
import Image3 from '../../images/burger-classic.jpg';

import { data } from '../Products/dummyData';

// import data from './data.json';

const Products = () => {
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch('./data.json', {
	// 				method: 'GET',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 			});
	// 			const json = await response.json();
	// 			console.log(json);
	// 		} catch (e) {
	// 			console.log('error', e);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

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
				{data.map((el, i) => (
					<ProductsCard key={i}>
						<ProductsImg src={el.img} alt={el.alt} />
						<ProductsTitle>{el.name}</ProductsTitle>
						<ProductsDesc>{el.desc}</ProductsDesc>
						<ProductsPrice>${el.price}</ProductsPrice>
						<Button>{el.button}</Button>
					</ProductsCard>
				))}

				{/* <ProductsCard>
					<ProductsImg src={Image1} />
					<ProductsTitle>Chicken Burger</ProductsTitle>
					<ProductsDesc>
						Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
						ipsum Lorem ipsum
					</ProductsDesc>
					<ProductsPrice>$10.00</ProductsPrice>
					<Button>Order</Button>
				</ProductsCard> */}

				{/* <ProductsCard>
					<ProductsImg src={Image2} />
					<ProductsTitle>Chicken Burger</ProductsTitle>
					<ProductsDesc>
						Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
						ipsum Lorem ipsum
					</ProductsDesc>
					<ProductsPrice>$10.00</ProductsPrice>
					<ProductsButton>Order</ProductsButton>
				</ProductsCard> */}

				{/* <ProductsCard>
					<ProductsImg src={Image3} />
					<ProductsTitle>Chicken Burger</ProductsTitle>
					<ProductsDesc>
						Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
						ipsum Lorem ipsum
					</ProductsDesc>
					<ProductsPrice>$10.00</ProductsPrice>
					<ProductsButton>Order</ProductsButton>
				</ProductsCard> */}
			</ProductsWrapper>
		</ProductsContainer>
	);
};

export default Products;
