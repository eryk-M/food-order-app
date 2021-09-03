import React, { useState, useContext } from 'react';

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
	ProductsLink,
} from './ProductsElements';

import { data } from '../Products/dummyData';

import { ProductsContext } from '../../contexts/ProductsContext';

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

	const products = useContext(ProductsContext);

	const [filteredItems, setFilteredItems] = useState(products);
	// const [isOpen, setIsOpen] = useState(false);
	// const [currentItem, setCurrentItem] = useState();

	const options = ['All', 'Burgers', 'Chicken'];

	const filterProducts = (e, option) => {
		const options = [
			...document.body.querySelectorAll(
				'.ProductsElements__ProductsOption-sc-1g6n3ml-3'
			),
		];
		options.forEach((option) => option.classList.remove('active'));
		e.target.classList.add('active');

		if (option === 'All') {
			setFilteredItems(products);
		} else {
			const filteredBurgers = data.filter(
				(el) => el.category === option
			);
			setFilteredItems(filteredBurgers);
		}
	};

	// const findItem = (e) => {
	// 	const item = data.find(
	// 		(el) => Number(e.currentTarget.dataset.id) === el.id
	// 	);
	// 	setCurrentItem(item);
	// };

	return (
		<>
			<ProductsContainer>
				<ProductsHeading>Our menu</ProductsHeading>
				<ProductsFilter>
					{options.map((option, i) => (
						<ProductsOption
							onClick={(e) => filterProducts(e, option)}
							key={i}
							className={option === 'All' ? 'active' : ''}
						>
							{option}
						</ProductsOption>
					))}
				</ProductsFilter>
				<ProductsWrapper>
					{/* item */}
					{filteredItems.map((el) => (
						<ProductsLink key={el.id} to={`/product/${el.id}`}>
							<ProductsCard
								data-id={el.id}
								onClick={(e) => {
									// setIsOpen(true);
									// findItem(e);
								}}
							>
								<ProductsImg src={el.img} alt={el.alt} />
								<ProductsTitle>{el.name}</ProductsTitle>
								<ProductsDesc>{el.desc}</ProductsDesc>
								<ProductsPrice>${el.price}</ProductsPrice>
							</ProductsCard>
						</ProductsLink>
					))}
				</ProductsWrapper>
			</ProductsContainer>
		</>
	);
};

export default Products;
