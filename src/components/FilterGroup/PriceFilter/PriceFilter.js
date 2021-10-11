import React from 'react';

import {
	PriceFilterContainer,
	PriceFilterSpan,
} from './PriceFilterElements';

import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './rc-slider-override.css';

export const PriceFilter = ({ price }) => {
	return (
		<PriceFilterContainer>
			<PriceFilterSpan size={1.6}>
				Filter by price: ${price.minPrice} - ${price.maxPrice}
			</PriceFilterSpan>
			<Range
				min={0}
				max={40}
				allowCross={false}
				defaultValue={[0, 40]}
				onChange={(value) => {
					price.setMinPrice(value[0]);
					price.setMaxPrice(value[1]);
				}}
			/>
		</PriceFilterContainer>
	);
};
