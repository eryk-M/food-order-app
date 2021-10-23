import styled, { keyframes, css } from 'styled-components/macro';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const moveRightDown = keyframes`
from {
    transform: translate(0, 0);
    opacity: 0
}

to {
    transform: translate(0.6rem, 0.6rem);
        opacity: 1;
}
`;

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

	@media (max-width: 360px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const ItemImageWrapper = styled.div`
	position: relative;
	max-width: 20rem;
	height: 20rem;
	display: block;
	background-color: var(--color-grey-light);
	&::before {
		content: '';
		position: absolute;
		transform: translate(0.6rem, 0.6rem);
		height: 20rem;
		width: 20rem;
		background-color: var(--color-primary);
		z-index: -1;
		opacity: ${({ loaded }) => (loaded ? '1' : '0')};
		animation: ${({ loaded }) =>
			loaded
				? css`
						${moveRightDown} .3s ease-in-out
				  `
				: ''};
	}
	&::after {
		content: 'SALE';
		position: absolute;
		right: 1rem;
		top: 1rem;
		background-color: var(--color-green);
		font-size: 1.4rem;
		color: var(--color-white);
		padding: 0.5rem;
		border-radius: 5px;
		z-index: 1;
		visibility: ${({ discount }) =>
			discount ? 'visible' : 'hidden'};
	}
`;

export const ItemImage = styled(LazyLoadImage)`
	display: block;
	width: 20rem;
	height: 20rem;
	object-fit: cover;
`;

export const ItemInfo = styled.div`
	margin: 1rem 0 0 2rem;
	@media (max-width: 360px) {
		margin: 2rem auto;
		text-align: center;
	}
`;

export const ItemHeading = styled.h2`
	font-size: 2rem;
	display: inline-block;
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
	@media (max-width: 360px) {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 3rem;
	}
`;

export const ItemPrice = styled.span`
	font-family: 'Arvo', sans-serif;
	font-weight: 700;
	color: ${({ discount }) =>
		discount ? 'var(--color-grey-light-2)' : 'var(--color-primary)'};
	font-size: 2rem;
	display: block;
	margin-top: 1rem;
	text-decoration: ${({ discount }) =>
		discount ? 'line-through' : 'none'};
	display: block;
	margin-right: ${({ discount }) => (discount ? '1rem' : '')};
`;

export const ItemAlertWrapper = styled.div`
	display: none;
	@media (max-width: 360px) {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		position: absolute;
		top: 50rem;
	}
`;
