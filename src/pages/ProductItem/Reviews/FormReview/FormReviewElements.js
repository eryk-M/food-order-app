import styled from 'styled-components/macro';

export const FormReviewContainer = styled.div`
	max-width: 70rem;
	margin: 0 auto;
	background-color: #fff;
	box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
	border-radius: 5px;
`;

export const FormReviewForm = styled.form`
	width: 100%;
	padding-left: 15px;
	padding-right: 15px;
	padding: 2rem;
`;

export const FormReviewNote = styled.p`
	margin: 2rem 0;
	text-align: center;
	font-size: 1.8rem;
`;

export const FormReviewFormRating = styled.div``;

export const FormReviewLabelRating = styled.label`
	display: block;
	font-weight: 600;
	max-width: 100%;
	margin-bottom: 5px;
	font-size: 1.6rem;
`;

export const FormReviewFormComment = styled.div`
	margin-bottom: 1rem;
`;

export const FormReviewFormCommentLabel = styled.label`
	font-size: 1.6rem;
	color: #a1a1a1;
	font-weight: 400;
	max-width: 100%;
	display: block;
	margin-bottom: 2rem;
`;

export const FormReviewFormCommentBottom = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const FormReviewNotLoggedIn = styled.p`
	font-size: 1.8rem;
	padding: 5rem;
	text-align: center;

	& a {
		color: var(--color-primary);
		font-weight: bold;
	}
`;

export const AlreadyReviewed = styled.p`
	font-size: 1.8rem;
	padding: 5rem;
	text-align: center;
`;
