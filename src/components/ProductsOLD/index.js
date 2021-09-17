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

import { useApi } from 'contexts/APIContext';

import { dummyData } from '../ProductsOLD/dummyData';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAllProducts } from 'utils/firebaseGetters';

const Products = () => {
	const { data } = useFirestoreQuery(getAllProducts());
	//API
	const { setItems } = useApi();

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

	return (
		<>
			<button onClick={onSetItems}>ustaw itemy</button>
			<ProductsContainer>
				<ProductsHeading>Our menu</ProductsHeading>
				<ProductsFilter>
					{options.map((option, i) => (
						<ProductsOption
							key={i}
							className={option === 'All' ? 'active' : ''}
						>
							{option}
						</ProductsOption>
					))}
				</ProductsFilter>
				<ProductsWrapper>
					{/* item */}
					{data &&
						data.map((el) => (
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
