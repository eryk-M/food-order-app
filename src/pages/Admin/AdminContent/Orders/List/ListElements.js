import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import {
	TableCellHead,
	Table,
	TableRow,
	TableCell,
	MainContainer,
} from 'components';
import { device } from 'utils/breakpoints';
import { SearchContainer } from 'components/FilterGroup/Search/SearchElements';
import { PaginationContainer } from 'components/Pagination/PaginationElements';

export const ListContainer = styled(MainContainer)`
	display: block;
	& ${Table} {
		display: table;
		@media ${device.laptopM} {
			width: 100%;
		}

		& ${TableCellHead} {
			padding: 1rem 0;

			&:not(:first-of-type) {
				text-align: center;
				@media ${device.laptopM} {
					text-align: center;
				}
			}
			&:nth-of-type(3) {
				cursor: pointer;
				@media ${device.laptopM} {
					width: 15rem;
				}
			}
			&:nth-of-type(4) {
				@media ${device.laptopM} {
					text-align: center;
				}
			}
			&:first-of-type {
				padding-left: 3rem;
				width: 18rem;
			}
		}

		& ${TableRow} {
			@media ${device.mobileM} {
				border: 1px solid rgba(0, 0, 0, 0.1);
				padding: 1rem;
				margin-top: 1rem;
			}

			&:nth-child(even) {
				@media ${device.mobileM} {
					border: 1px solid rgba(0, 0, 0, 0.1);
					padding: 1rem;
				}
			}
		}

		& ${TableCell} {
			padding: 1rem 0;
			&:first-of-type {
				padding-left: 3rem;
				@media ${device.mobileM} {
					padding-left: 0rem;
					vertical-align: middle;
				}
				& .checkbox-group {
					@media ${device.mobileM} {
						vertical-align: middle;
					}
				}
			}
			@media ${device.laptopM} {
				width: 20rem;
			}
			@media ${device.mobileM} {
				width: unset;
			}

			&:last-of-type {
				@media ${device.mobileM} {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
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

export const MobileFilter = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 1.6rem;
	background-color: var(--color-background-grey-light);
	padding: 1rem 0.5rem;
	margin-top: 0.7rem;
	width: 100%;
	& input {
		margin-right: 1rem;
	}
	@media only screen and (min-width: 461px) {
		display: none;
	}
`;

export const AllCheckerMobile = styled.div`
	display: flex;
	align-items: center;
`;

export const StatusMobile = styled.div``;

export const ListInfoNote = styled.p`
	font-size: 1.8rem;
	margin-bottom: 2rem;
	font-weight: 100;
`;

export const ListDialogBox = styled(motion.div)`
	display: flex;
	background-color: #ffe9e9;
	padding: 2rem;
	align-items: center;
	@media ${device.mobileM} {
		padding: 1rem 2rem;
		margin-top: 6.5rem;
	}
`;

export const ListDialogBoxNote = styled.p`
	font-size: 1.8rem;
	font-weight: 100;
`;

export const ListCheckbox = styled.input`
	margin-right: 1rem;
	vertical-align: -1px;
`;
