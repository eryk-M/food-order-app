import React from 'react';

import {
	ContentContainer,
	ContentItem,
	ContentItemImage,
	ContentItemInfo,
	ContentItemHeading,
	ContentItemDesc,
	ContentItemButton,
} from './ContentElements';

const Content = () => {
	return (
		<ContentContainer>
			<ContentItem>
				<ContentItemImage />
				<ContentItemInfo>
					<ContentItemHeading>Burger Classic</ContentItemHeading>
					<ContentItemDesc>
						Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
						ipsum lorem ipsum Lorem ipsum lorem ipsum
					</ContentItemDesc>
					<ContentItemButton>Add to cart</ContentItemButton>
				</ContentItemInfo>
			</ContentItem>
		</ContentContainer>
	);
};

export default Content;
