import styled from 'styled-components/macro';

export const ItemWrapper = styled.li`
	display: flex;
	padding: 0 1rem;
	padding-bottom: 3rem;
	position: relative;
	&:not(:last-of-type) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	&:not(:first-of-type) {
		padding-top: 3rem;
	}
`;

export const ItemImageWrapper = styled.div`
	position: relative;
	width: 20rem;
	height: 20rem;
	&::before {
		content: '';
		position: absolute;
		top: 0.6rem;
		right: -0.6rem;
		height: 20rem;
		width: 20rem;
		background-color: var(--color-primary);
		z-index: -1;
	}
`;

export const ItemImage = styled.img`
	display: block;
	height: 20rem;
`;

export const ItemInfo = styled.div`
	margin: 1rem 0 0 2rem;
`;

export const ItemHeading = styled.h2`
	font-size: 2rem;
`;

export const ItemDesc = styled.p`
	font-size: 1.4rem;
	color: var(--color-grey-dark);
	font-style: italic;
	line-height: 1.4;
	word-wrap: break-word;
`;

export const ItemButton = styled.div`
	display: block;
	margin-left: auto;
	width: 13rem;
	margin-right: 1rem;
	margin-top: 1rem;

	&:disabled {
		opacity: 0.2;
	}
`;

export const ItemPrice = styled.span`
	font-family: 'Arvo', sans-serif;
	font-weight: 700;
	color: var(--color-primary);
	font-size: 2rem;
	display: block;
	margin-top: 1rem;
`;
