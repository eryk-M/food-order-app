import React from 'react';

import {
	CouponCard,
	CouponTitle,
	CouponP,
	CouponCode,
} from './CouponElements.js';

export const Coupon = ({ el }) => {
	return (
		<>
			<CouponCard>
				<CouponTitle>Coupon</CouponTitle>
				<CouponCode>{el.code}</CouponCode>
				<CouponP>{el.discount}%</CouponP>
				<CouponP>From: ${el.fromPrice}</CouponP>
			</CouponCard>
		</>
	);
};
