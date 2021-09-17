import styled from 'styled-components/macro';

export const OrderWrapper = styled.div`
	display: flex;
	background-color: #efefef;
	padding: 2rem;
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
