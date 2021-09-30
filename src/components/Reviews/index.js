import React, {
	useEffect,
	useState,
	useRef,
	lazy,
	Suspense,
} from 'react';

import FormReview from './FormReview';
// import UserReviews from './UserReviews';

import { useAuth } from 'contexts/AuthContext';
import styled from 'styled-components/macro';
import Loader from 'components/Loader';
import { LoaderWrapper } from 'pages/Admin/AdminContent/Orders/Order/OrderElements';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getReviews } from 'utils/firebaseGetters';

const UserReviews = lazy(() => import('./UserReviews'));

const ReviewsContainer = styled.section`
	background-color: #93949417;
	padding-bottom: 3rem;
`;

const ReviewsHeading = styled.h2`
	text-align: center;
	font-size: 2.6rem;
	padding-top: 3rem;
	margin-bottom: 3rem;
`;

const Reviews = ({ productId }) => {
	const { currentUser } = useAuth();
	const sectionReviewRef = useRef();
	const [isAdded, setIsAdded] = useState(false);

	const { data, loading } = useFirestoreQuery(getReviews(productId));

	useEffect(() => {
		if (currentUser) {
			const user = data?.some((el) => el.userId === currentUser.uid);
			if (user) setIsAdded(true);
		}
	}, [data, currentUser]);

	return (
		<ReviewsContainer ref={sectionReviewRef}>
			<ReviewsHeading>Reviews</ReviewsHeading>

			<Suspense fallback={<Loader margincenter primary />}>
				<UserReviews reviews={data} loading={loading} />
			</Suspense>

			<FormReview
				setIsAdded={setIsAdded}
				isAdded={isAdded}
				sectionReviewRef={sectionReviewRef}
				productId={productId}
			/>
		</ReviewsContainer>
	);
};

export default Reviews;
