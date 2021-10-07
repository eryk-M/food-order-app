import styled from 'styled-components/macro';

export const OrderWrapper = styled.div`
	display: flex;
	background-color: var(--color-background-grey-light);
	padding: 2rem;
	text-align: left;
	justify-content: space-around;
	width: 100%;
	&:hover {
		background-color: inherit;
	}
`;

export const OrderContent = styled.div`
	margin-left: -2rem;
	&:not(:first-of-type) {
		margin-left: 2rem;
	}
`;

export const OrderHeading = styled.p`
	font-weight: bold;
`;

export const OrderInfo = styled.p``;
