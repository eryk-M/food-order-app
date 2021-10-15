import styled from 'styled-components/macro';

export const Button = styled.button`
	width: ${({ width }) => width};
	margin-left: ${({ marginleft }) => marginleft};
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.4rem;
	background-color: ${({ secondary }) =>
		secondary ? '#fff' : 'var(--color-primary)'};
	color: ${({ secondary }) =>
		secondary ? '#000' : 'var(--color-grey-light)'};
	border: ${({ secondary }) =>
		secondary ? '1px solid var(--color-primary)' : 'none'};
	cursor: pointer;
	transition: all 0.2s;
	margin-bottom: ${({ marginbottom }) => marginbottom};
	border-radius: 5px;
	display: ${({ display }) => display ?? ''};
	vertical-align: middle;
	&:hover {
		@media (min-width: 1025px) {
			background-color: var(--color-secondary);
			color: var(--color-grey-dark);
		}
	}
	&:disabled {
		opacity: 0.5;
		cursor: default;
		&:hover {
			background-color: var(--color-primary);
			color: var(--color-grey-light);
		}
	}
	@media screen and (max-width: 570px) {
		margin-bottom: 0;
	}
`;
