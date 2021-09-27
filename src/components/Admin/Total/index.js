import React from 'react';

import { TotalContainer } from '../Containers';

import {
	TotalLeft,
	TotalRight,
	TotalH,
	TotalP,
	TotalNumber,
} from './TotalElements';

const Total = ({ spanColor, top, bottom, number }) => {
	return (
		<TotalContainer>
			<TotalLeft>
				<TotalH>{top}</TotalH>
				<TotalP>{bottom}</TotalP>
			</TotalLeft>
			<TotalRight>
				<TotalNumber spanColor={spanColor}>{number}</TotalNumber>
			</TotalRight>
		</TotalContainer>
	);
};

export default Total;
