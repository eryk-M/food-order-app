import styled from 'styled-components/macro';

export const OrderContainer = styled.div``;

export const MiddleWrapper = styled.div`
	text-align: center;
	font-size: 1.8rem;
`;

export const OrderP = styled.p`
	display: block;
	margin-right: 2rem;
	line-height: 1.5;
	font-size: ${(props) => (props.medium ? '1.8rem' : '')};
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
`;

export const OrderShipping = styled.div``;

export const OrderInfo = styled.div`
	/* border-right: 1px solid red; */
	/* width: 33.3%; */
	margin: 0 auto;
	/* padding-right: 10%; */
`;

export const OrderTotal = styled.p`
	display: inline-block;
	margin-left: auto;
	/* width: 30rem; */
`;

export const OrderSteps = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-gap: 5rem;
	margin-top: 2rem;
`;

export const OrderChangeButton = styled.button`
	padding: 2rem 0;
	cursor: pointer;
	border: none;
	border-radius: 5px;
	font-size: 1.6rem;
	font-weight: bold;
	background-color: ${(props) => {
		if (props.step === 2) return 'var(--color-secondary)';
		else if (props.step === 1) return 'var(--color-blue)';
		else if (props.step === 3) return 'var(--color-primary)';
		else if (props.step === 5) return 'var(--color-grey-light)';
		else return 'var(--color-green)';
	}};
	color: ${(props) =>
		props.step === 5 ? 'var(--color-black)' : '#fff'};
	transition: 0.1s all ease-in-out;
	&:hover {
		transform: translateY(-6px);
		box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
	}
	&:active {
		transform: translateY(-2px);
		box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.5);
	}
`;

export const UserStatus = styled.p`
	font-weight: bold;
`;

export const UserOrderStatus = styled.span`
	display: inline-block;
	/* font-style: italic;
	font-weight: 100; */
	border-radius: 1rem;
	font-size: 1.6rem;
	padding: 0.4rem 1rem;
	opacity: ${(props) => (props.step === 5 ? '0.6' : '')};
	color: ${(props) => (props.step === 5 ? '#969696' : '#fff')};
	background-color: ${(props) => {
		if (props.step === 2) return 'var(--color-secondary)';
		else if (props.step === 1) return 'var(--color-blue)';
		else if (props.step === 3) return 'var(--color-primary)';
		else if (props.step === 5) return '#dededd';
		else if (props.step === 0) return 'var(--color-blue)';
		else return 'var(--color-green)';
	}};
	margin-left: 1rem;
`;

export const LoaderWrapper = styled.div`
	position: absolute;
`;

export const PrintButton = styled.button`
	position: absolute;
	right: 2.5rem;
	top: 2rem;
	padding: 0.5rem 1rem;
	cursor: pointer;
	/* outline: none; */
	text-transform: uppercase;
`;