import React, { useState } from 'react';

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
	ProductsLink,
} from './ProductsElements';

import Button from '../Button';

import Image1 from '../../images/burger-chicken.jpg';
import Image2 from '../../images/burger-double.jpg';
import Image3 from '../../images/burger-classic.jpg';

import { data } from '../Products/dummyData';
import Modal from '../../components/Modal';
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

	const [initialItems, setInitialItems] = useState(data);
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState();

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
			setInitialItems(data);
		} else {
			const filteredBurgers = data.filter(
				(el) => el.category === option
			);
			setInitialItems(filteredBurgers);
		}
	};

	const findItem = (e) => {
		const item = data.find(
			(el) => Number(e.currentTarget.dataset.id) === el.id
		);
		setCurrentItem(item);
	};

	return (
		<>
			<Modal
				item={currentItem}
				open={isOpen}
				onClose={() => setIsOpen(false)}
			>
				Im Modal
			</Modal>
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
					{initialItems.map((el) => (
						<ProductsCard
							key={el.id}
							data-id={el.id}
							onClick={(e) => {
								setIsOpen(true);
								findItem(e);
							}}
						>
							<ProductsImg src={el.img} alt={el.alt} />
							<ProductsTitle>{el.name}</ProductsTitle>
							<ProductsDesc>{el.desc}</ProductsDesc>
							<ProductsPrice>${el.price}</ProductsPrice>
						</ProductsCard>
					))}
				</ProductsWrapper>
			</ProductsContainer>
		</>
	);
};

export default Products;
