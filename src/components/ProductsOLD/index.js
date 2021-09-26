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
	ProductsLink,
} from './ProductsElements';

import { useApi } from 'contexts/APIContext';

import { dummyData } from 'utils/dummyData';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAllProducts } from 'utils/firebaseGetters';

const Products = () => {
	const { data } = useFirestoreQuery(getAllProducts());
	//API
	const { setItems } = useApi();
	const onSetItems = (admin) => {
		try {
			console.log('Wrzucam...');
			setItems(dummyData, true);
			setItems(dummyData);
		} catch (err) {
			console.log(err);
		}
	};

	const options = ['All', 'Burgers', 'Chicken'];

	return (
		<>
			<button onClick={onSetItems}>ustaw itemy</button>
			<button onClick={() => onSetItems(true)}>
				ustaw admin products
			</button>
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
