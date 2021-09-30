import React from 'react';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserDoc } from 'utils/firebaseGetters';
import { useAuth } from 'contexts/AuthContext';
import Coupon from 'components/Coupon';

import { UserAccountHeading } from '../UserAccount/UserAccountElements';
import {
	UserCouponsContainer,
	UserCouponsNotAvailable,
	SadIcon,
} from './UserCouponsElements';

const UserCoupons = () => {
	const { currentUser } = useAuth();
	const { data, loading } = useFirestoreQuery(
		getUserDoc(currentUser.uid)
	);

	const findAvailableCoupons = () => {
		return data.coupons.filter(
			({ code: id1 }) =>
				!data.usedCoupons.some(({ code: id2 }) => id2 === id1)
		);
	};

	return (
		<>
			<UserAccountHeading>Available coupons</UserAccountHeading>
			<UserCouponsContainer>
				{data &&
					findAvailableCoupons().map((el) => <Coupon el={el} />)}
			</UserCouponsContainer>
			{data && findAvailableCoupons().length === 0 && (
				<UserCouponsNotAvailable>
					<SadIcon /> 0 available coupons
				</UserCouponsNotAvailable>
			)}
		</>
	);
};

export default UserCoupons;
