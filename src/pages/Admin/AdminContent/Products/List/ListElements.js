import styled from 'styled-components/macro';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { device } from 'utils/breakpoints';
import {
	Loader,
	MainContainer,
	TableCellHead,
	TableCell,
	TableRow,
} from 'components';
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
export const ListImageWrapper = styled.div`
	height: 6rem;
	width: 6rem;
	background-color: var(--color-grey-light);
	display: inline-block;
	border-radius: 5px;
`;

export const ListImage = styled(LazyLoadImage)`
	height: 6rem;
	width: 6rem;
	object-fit: cover;
	border-radius: 5px;
`;

export const ProductsResetButton = styled.button`
	margin-bottom: 2rem;
	padding: 1rem 1.6rem;
	display: inline-block;
	font-size: 1.4rem;
	background-color: ${({ resetSuccess }) => {
		if (resetSuccess) {
			return 'var(--color-green)';
		} else {
			return 'var(--color-secondary);';
		}
	}};
	color: var(--color-grey-dark);
	width: 20rem;
	border: none;
	border-radius: 5px;
	position: relative;
	text-transform: uppercase;
	&:hover {
		cursor: pointer;
	}
	&:disabled {
		opacity: 0.8;
		&:hover {
			color: var(--color-grey-dark);
			cursor: default;
		}
	}

	@media ${device.mobileM} {
		margin-bottom: 0rem;
		margin-top: 2rem;
	}
`;

const LoaderReset = styled(Loader)`
	height: 2rem;
	width: 2rem;
	position: absolute;
	display: block;
	top: 50%;
	left: 1rem;
	transform: translateY(-50%);
`;

export const ProductsReset = ({
	loading,
	onSetItems,
	resetSuccess,
	showSuccess,
}) => {
	return (
		<ProductsResetButton
			onClick={onSetItems}
			disabled={loading || resetSuccess || showSuccess}
			resetSuccess={resetSuccess}
		>
			{resetSuccess && 'Done'}
			{loading && <LoaderReset />}
			{loading && 'Resetting...'}
			{!loading && !resetSuccess && 'Reset products'}
		</ProductsResetButton>
	);
};
