import styled from 'styled-components/macro';

export const OrdersTableWrapper = styled.div`
	overflow-y: scroll;
	height: 50rem;
`;

export const OrdersTable = styled.table`
	/* display: table; */
	/* display: block; */
	width: 100%;
	table-layout: fixed;
`;

export const OrdersTableBody = styled.tbody`
	/* display: table-row-group; */

	/* max-width: 90rem; */
`;

export const OrdersTableRow = styled.tr`
	/* display: table-row; */
	font-size: 1.4rem;
	background-color: ${(props) => props.backgroundColor};
	font-weight: ${(props) => props.fontW};

	& .cell-word-wrap {
		word-wrap: break-word;
	}
`;

export const OrdersTableCell = styled.td`
	/* display: table-cell; */
	padding: 1rem 3rem;
	padding: ${(props) => props.padding ?? '1rem 3rem'};
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	/* width: 100%; */
	/* word-wrap: break-word; */
`;

export const OrdersTableButton = styled.button`
	padding: 0.6rem 0.8rem;
	background-color: var(--color-primary);
	color: var(--color-white);
	border-radius: 50%;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: all 0.1s;

	& svg {
		vertical-align: middle;
		margin-left: 0.8rem;
	}
	&:hover {
		background-color: var(--color-secondary);
		color: var(--color-black);
	}
`;
