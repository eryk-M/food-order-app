import React, { useState } from 'react';

//for testing
import { data } from '../Products/dummyData';

import {
	ProductContainer,
	ProductLeft,
	ProductImg,
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
	ProductStar,
	ProductStarIcons,
	ProductRating,
	ProductPrice,
	ProductBackground,
} from './ProductItemElements';

const ProductItem = ({ props }) => {
	const [currentItem, setCurrentItem] = useState();

	//testing instead of fetching
	const findItem = () => {
		const item = data.find(
			(el) => Number(props.match.params.id) === el.id
		);
		setCurrentItem(item);
	};

	if (!currentItem) findItem();
	//

	return (
		<>
			{currentItem && (
				<ProductContainer>
					{/* <ProductBackground /> */}
					<ProductLeft>
						<ProductImg src={currentItem.img} />
					</ProductLeft>

					<ProductRight>
						<ProductTitle>{currentItem.name}</ProductTitle>
						<ProductPrice>${currentItem.price}</ProductPrice>
						<ProductStarIcons>
							<ProductStar />
							<ProductStar />
							<ProductStar />
							<ProductStar />
							<ProductStar />
						</ProductStarIcons>
						<ProductRating>0/5 (0 ratings)</ProductRating>
						<ProductDesc>{currentItem.desc}</ProductDesc>
						<ProductIngredients>
							{currentItem.ingredients.map((el) => (
								<ProductIngredientsItem>{el}</ProductIngredientsItem>
							))}
						</ProductIngredients>
						<ProductForm>
							<ProductQuantityLabel htmlFor="quantity">
								Quantity:
							</ProductQuantityLabel>
							<ProductQuantity
								name="quantity"
								type="number"
								value="1"
							/>
							<ProductButton>
								<ProductCartIcon />
								{currentItem.button}
							</ProductButton>
						</ProductForm>
					</ProductRight>
				</ProductContainer>
			)}
		</>
	);
};

export default ProductItem;
