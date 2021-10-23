import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';
import { AlertSuccessIcon } from 'components/Alert/AlertElements';
export const OrderContainer = styled.div`
	padding: 1rem;
`;

export const MiddleWrapper = styled.div`
	text-align: center;
	font-size: 1.8rem;
`;

export const OrderP = styled.p`
	display: block;
	margin-right: 2rem;
	line-height: 1.5;
	font-size: ${({ medium }) => (medium ? '1.8rem' : '')};
`;

export const OrderHeading = styled.p`
	display: inline-block;
	font-size: 2rem;
	font-weight: bold;
	margin: 2rem 0;
	margin-right: 2rem;
`;

export const OrderDate = styled.p`
	margin-right: 2rem;
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

export const OrderWrapper = styled.div`
	display: flex;
	font-size: 1.4rem;
	background-color: #fff;
	padding: 2rem;

	@media ${device.mobileM} {
		flex-wrap: wrap;
		padding: 2rem 0;
		justify-content: space-around;
	}
`;

export const OrderShipping = styled.div``;

export const OrderInfo = styled.div`
	margin: 0 auto;
	@media ${device.mobileM} {
		width: 50%;
		text-align: center;
	}
	@media only screen and (max-width: 360px) {
		width: 100%;
	}
`;

export const OrderTotal = styled.p`
	display: inline-block;
	margin-left: auto;
`;

export const OrderSteps = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-gap: 5rem;
	margin-top: 2rem;
	position: relative;
	@media ${device.tablet} {
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
	}
	@media ${device.mobileM} {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}
	& ${AlertSuccessIcon} {
		@media only screen and (max-width: 340px) {
			margin-right: 0;
		}
	}
`;

export const OrderChangeButton = styled.button`
	padding: 2rem 0;
	cursor: pointer;
	border: none;
	border-radius: 5px;
	font-size: 1.6rem;
	font-weight: bold;
	background-color: ${({ step }) => {
		if (step === 2) return 'var(--color-secondary)';
		else if (step === 1) return 'var(--color-blue)';
		else if (step === 3) return 'var(--color-primary)';
		else if (step === 5) return 'var(--color-grey-light)';
		else return 'var(--color-green)';
	}};
	color: ${({ step }) =>
		step === 5 ? 'var(--color-black)' : '#fff'};
	transition: 0.1s all ease-in-out;
	@media only screen and (min-width: 1024px) {
		&:hover {
			transform: translateY(-6px);
			box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.3);
		}
	}

	&:active {
		transform: translateY(0px);
		box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.3);
	}

	&:disabled {
		opacity: 0.5;
		&:hover {
			transform: none;
			box-shadow: none;
			cursor: default;
		}
	}
`;

export const UserStatus = styled.p`
	font-weight: bold;
`;

export const UserOrderStatus = styled.span`
	display: inline-block;
	border-radius: 1rem;
	font-size: 1.6rem;
	padding: 0.4rem 1rem;
	opacity: ${({ step }) => (step === 5 ? '0.6' : '')};
	color: ${({ step }) => (step === 5 ? '#969696' : '#fff')};
	background-color: ${({ step }) => {
		if (step === 2) return 'var(--color-secondary)';
		else if (step === 1) return 'var(--color-blue)';
		else if (step === 3) return 'var(--color-primary)';
		else if (step === 5) return '#dededd';
		else if (step === 0) return 'var(--color-blue)';
		else return 'var(--color-green)';
	}};
	margin-left: 1rem;
`;

export const LoaderWrapper = styled.div`
	position: absolute;
	top: ${({ top }) => top};
	right: ${({ right }) => right};
`;

export const PrintButton = styled.button`
	position: absolute;
	right: 2.5rem;
	top: 2rem;
	padding: 0.5rem 1rem;
	cursor: pointer;
	text-transform: uppercase;
	border: none;
	border-radius: 5px;
	& span {
		@media ${device.mobileM} {
			display: none;
		}
	}

	@media ${device.mobileM} {
		top: 0;
		right: 0;
	}
`;
