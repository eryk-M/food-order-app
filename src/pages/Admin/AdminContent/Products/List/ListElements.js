import styled from 'styled-components/macro';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MainContainer } from 'components/Admin/Containers';

import { device } from 'utils/breakpoints';

import {
	TableCellHead,
	TableCell,
	TableRow,
} from 'components/Table/TableElements';
import { SearchContainer } from 'components/FilterGroup/Search/SearchElements';
import { PaginationContainer } from 'components/Pagination/PaginationElements';

export const ProductsListContainer = styled(MainContainer)`
	${TableCellHead} {
		padding: 1rem 0;
		text-align: center;
	}

	${TableCell} {
		padding: 1.5rem 1rem;

		&:first-of-type {
			text-align: center;

			@media ${device.mobileM} {
				width: unset;
				text-align: right;
			}
		}
		&:nth-of-type(4) {
			@media only screen and (max-width: 600px) {
				display: none;
			}
			@media only screen and (max-width: 500px) {
				padding: 0;
				width: 35%;
			}
		}

		&:nth-of-type(6) {
			text-align: center;

			@media ${device.mobileM} {
				text-align: right;
			}
		}

		&:nth-of-type(7) {
			text-align: center;

			@media ${device.mobileM} {
				text-align: right;
			}
		}
	}

	& ${TableCellHead} {
		&:nth-of-type(2),
		&:nth-of-type(3) {
			text-align: left;
			padding-left: 1rem;

			@media ${device.mobileL} {
				width: 20%;
			}
		}

		&:nth-of-type(4) {
			@media only screen and (max-width: 600px) {
				display: none;
			}
		}
		&:last-of-type {
			@media only screen and (max-width: 500px) {
				padding: 0;
				width: 35%;
			}
		}
	}

	& ${TableRow} {
		@media ${device.mobileM} {
			border: 1px solid rgba(0, 0, 0, 0.1);
			margin-top: 1rem;
		}

		&:nth-child(even) {
			@media ${device.mobileM} {
				border: 1px solid rgba(0, 0, 0, 0.1);
			}
		}
	}

	& ${SearchContainer} {
		@media ${device.mobileM} {
			width: 100%;
			margin-bottom: 6rem;
		}
	}

	& ${PaginationContainer} {
		@media ${device.mobileM} {
			top: 7.4rem;
		}
	}
`;

export const ListImage = styled(LazyLoadImage)`
	height: 6rem;
	width: 6rem;
	object-fit: cover;
	border-radius: 5px;
`;
