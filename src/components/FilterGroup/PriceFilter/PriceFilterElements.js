import styled from 'styled-components/macro';

export const PriceFilterContainer = styled.div`
	margin-bottom: 3rem;
	width: 20rem;
`;

export const PriceFilterSpan = styled.span`
	font-size: ${(props) => props.size + 'rem'};
	display: block;
	font-weight: 100;
	margin: 1rem 0;
	text-align: center;
`;
