import styled from 'styled-components/macro';

export const UserReviewsContainer = styled.div`
	max-width: 80rem;
	margin: 0 auto;
	margin-bottom: 2rem;
	padding: 0 1rem;
	position: relative;
`;

export const UserReview = styled.div`
	padding: 2rem 0.5rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const UserReviewName = styled.p`
	font-weight: bold;
	font-size: 1.8rem;
	display: inline-block;
`;

export const UserReviewTime = styled.span`
	margin-left: auto;
	font-size: 1.1rem;
	float: right;
	display: block;
`;

export const UserReviewRating = styled.div`
	margin: 1rem 0 0.5rem 1rem;
`;

export const UserReviewBody = styled.p`
	margin-left: 1rem;
	font-size: 1.4rem;
	word-wrap: break-word;
`;

export const UserReviewNoItems = styled.div`
	text-align: center;
	font-size: 1.8rem;
	padding: 5rem 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
