import React, { useState, useEffect } from 'react';

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

import { useApi } from '../../contexts/APIContext';

import { dummyData } from '../Products/dummyData';

const Products = () => {
	const [data, setData] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);

	//API
	const { setItems, getProducts } = useApi();

	const onSetItems = () => {
		try {
			console.log('Wrzucam...');
			setItems(dummyData);
			// await getImageUrl(data);
		} catch (err) {
			console.log(err);
		}
	};

	const options = ['All', 'Burgers', 'Chicken'];

	useEffect(() => {
		getProducts().then((data) => {
			setData(data);
			setFilteredItems(data);
		});
		return () => {
			setData();
			setFilteredItems();
		};
	}, [getProducts]);

	const filterProducts = (e, option) => {
		const options = [
			...document.body.querySelectorAll(
				'.ProductsElements__ProductsOption-sc-1g6n3ml-3'
			),
		];
		options.forEach((option) => option.classList.remove('active'));
		e.target.classList.add('active');

		if (option === 'All') {
			setFilteredItems(data);
		} else {
			const filteredBurgers = data.filter(
				(el) => el.category === option
			);
			setFilteredItems(filteredBurgers);
		}
	};

	return (
		<>
			<button onClick={onSetItems}>ustaw itemy</button>
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
					{filteredItems &&
						filteredItems.map((el) => (
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
