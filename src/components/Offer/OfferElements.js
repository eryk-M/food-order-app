import styled from 'styled-components/macro';
import ButtonLink from 'components/ButtonLink';
import Image from 'images/offer-quiz.jpg';
import { device } from 'utils/breakpoints';
export const OfferContainer = styled.div`
	height: 50rem;
	width: 100%;
	background-position: center;
	background-image: url(${Image});
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
	position: relative;

	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 0;
	}
	@media (max-width: 500px) {
		background-position: right;
	}

	@media ${device.laptopS} {
		background-attachment: scroll;
	}
`;

export const OfferContent = styled.div`
	min-width: 1360rem;
	margin: 0 auto;
	color: var(--color-grey-light);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

export const OfferH3 = styled.h3`
	font-size: 5rem;
	text-align: center;
	@media (max-width: 500px) {
		font-size: 4rem;
	}
	@media (max-width: 400px) {
		font-size: 3rem;
	}
`;

export const OfferLink = styled(ButtonLink)`
	background-color: var(--color-secondary);
	color: var(--color-grey-dark);
	font-size: 2.2rem;
	padding: 1.2rem 2.4rem;
	margin-top: 3rem;
	display: inline-block;
	margin: 3rem auto;
	text-transform: capitalize;
	border-radius: 5px;
	&:hover {
		@media (min-width: 1024px) {
			background-color: var(--color-primary);
			color: var(--color-white);
		}
	}
	@media (max-width: 400px) {
		font-size: 2rem;
	}
`;
