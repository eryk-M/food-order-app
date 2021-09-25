import styled from 'styled-components/macro';

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

	& .checkbox-group {
		margin-right: 1rem;
		vertical-align: -1px;
	}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
	/* display: table-row; */
	font-size: 1.4rem;
	background-color: ${(props) => props.backgroundColor};
	font-weight: ${(props) => props.fontW};

	&:not(:last-of-type) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	& .cell-word-wrap {
		word-wrap: break-word;
	}
	${(props) => {
		if (props.hover) {
			return '&:hover {background-color: #93949417;cursor: pointer;}';
		}
	}}
`;

export const TableCell = styled.td`
	padding: 1rem 3rem;
	padding: ${(props) => props.padding ?? '1rem 3rem'};
	width: ${(props) => props.width};
	text-align: ${(props) => (props.center ? 'center' : null)};
	cursor: ${(props) => (props.pointer ? 'pointer' : '')};
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

	& svg {
		vertical-align: middle;
		margin-left: 0.8rem;
	}
`;
