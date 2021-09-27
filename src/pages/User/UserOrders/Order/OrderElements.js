import styled from 'styled-components/macro';

export const OrderWrapper = styled.div`
	display: flex;
	background-color: #93949417;
	padding: 2rem;
	justify-content: space-around;
`;

export const OrderContent = styled.div`
	&:not(:first-of-type) {
		margin-left: 2rem;
	}
`;

export const OrderHeading = styled.p`
	font-weight: bold;
`;

export const OrderInfo = styled.p``;
