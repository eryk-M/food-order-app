import styled from 'styled-components/macro';

export const ReviewContainer = styled.div`
	max-width: 70rem;
	margin: 0 auto;
`;

export const ReviewForm = styled.form`
	width: 100%;
	padding-left: 15px;
	padding-right: 15px;
`;

export const ReviewNote = styled.p`
	margin: 0 0 1em;
	font-size: 1.6rem;
`;

export const ReviewFormRating = styled.div``;

export const ReviewLabelRating = styled.label`
	display: block;
	font-weight: 600;
	max-width: 100%;
	margin-bottom: 5px;
	font-size: 1.6rem;
`;

export const ReviewFormComment = styled.p`
	margin-bottom: 2.4em;
`;

export const ReviewFormCommentLabel = styled.label`
	font-size: 1.6rem;
	color: #a1a1a1;
	font-weight: 400;
	max-width: 100%;
	display: block;
	margin-bottom: 2rem;
`;

export const ReviewFormCommentText = styled.textarea`
	resize: none;
	padding-left: 0.875em;
	height: 20rem;
	width: 100%;
	border-radius: 0.5rem;
	padding: 0.473em 1.2em;
	color: #666;
	outline: 0;
	font-size: 1.6rem;
`;

export const ReviewFormCommentInput = styled.input`
	font-size: 1.6rem;
	padding: 0.473em 1.2em;
	color: #666;
	width: 100%;
	border-radius: 0.5rem;
`;

export const ReviewFormCommentBottom = styled.div`
	display: flex;
	justify-content: space-between;
`;
