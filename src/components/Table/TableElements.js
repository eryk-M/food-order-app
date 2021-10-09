import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const TableWrapper = styled.div`
	background-color: var(--color-white);
	padding: 1.5rem;
	border-radius: 5px;
	min-width: 80%;
`;

export const Table = styled.table`
	display: ${(props) => props.display};
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;

	.sort-active {
		background-color: var(--color-secondary);
	}

	.order-opened {
		display: table-row;
	}

	.order-closed {
		display: none;
	}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
	font-size: 1.4rem;
	background-color: ${(props) => props.backgroundColor};
	font-weight: ${(props) => props.fontW};

	& .cell-word-wrap {
		word-wrap: break-word;
	}
	${(props) => {
		if (props.hover) {
			return '&:hover {background-color: var(--color-background-grey-light);cursor: pointer;}';
		}
	}}
	@media (min-width: 768px) {
		&:hover {
			background-color: var(--color-background-grey-light);
		}
	}

	@media ${device.mobileM} {
		border-bottom: 1px solid #ddd;
		display: block;
		&:nth-child(even) {
			margin-bottom: 2rem;
			border: none;
		}
	}
`;

export const TableHead = styled.thead`
	padding: 1rem 3rem;
	clip: rect(0 0 0 0);
	background-color: var(--color-background-grey-light);
	&:hover {
		background-color: inherit;
	}
	@media ${device.mobileM} {
		border-top: none;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}
`;
export const TableCellHead = styled.th`
	padding: 1rem 3rem;
	text-align: left;
	width: ${(props) => props.width};
	cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
	transition: all 0.2s;
`;

export const TableCell = styled.td`
	padding: 1rem 3rem;
	padding: ${(props) => props.padding ?? '1rem 3rem'};
	width: ${(props) => props.width};
	text-align: ${(props) => (props.center ? 'center' : null)};
	cursor: ${(props) => (props.pointer ? 'pointer' : '')};

	@media ${device.mobileM} {
		font-size: 1.4rem;
		text-align: right;
		display: block;
		&::before {
			content: attr(data-label);
			float: left;
			font-weight: bold;
			text-transform: uppercase;
		}

		&:not(:last-of-type) {
			border-bottom: 1px solid #ddd;
		}
	}
`;

export const TableButton = styled.button`
	padding: 0.6rem 0.8rem;
	background-color: ${(props) => {
		if (props.primary) {
			return 'var(--color-primary)';
		} else if (props.secondary) {
			return 'var(--color-secondary)';
		}
	}};
	color: var(--color-white);
	margin-left: ${(props) => props.marginleft};
	border-radius: 50%;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: all 0.1s;

	@media only screen and (max-width: 840px) {
		font-size: 1.2rem;
	}

	& svg {
		vertical-align: middle;
		margin-left: 0.8rem;
	}
`;
