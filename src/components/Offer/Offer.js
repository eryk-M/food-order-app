import React from 'react';

import {
	OfferContainer,
	OfferH3,
	OfferLink,
	OfferContent,
} from './OfferElements';

export const Offer = () => {
	return (
		<OfferContainer>
			<OfferContent>
				<OfferH3>Take part in quizzes</OfferH3>
				<OfferH3>and win coupons!</OfferH3>
				<OfferLink
					to={{
						pathname: '/login',
						query: '/user/quizes',
					}}
				>
					Check
				</OfferLink>
			</OfferContent>
		</OfferContainer>
	);
};
