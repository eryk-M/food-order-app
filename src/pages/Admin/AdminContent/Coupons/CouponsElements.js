import styled from 'styled-components/macro';

import {
	MainContainer,
	FormGroup,
	FormElement,
	TableCell,
	TableRow,
} from 'components';

import { device } from 'utils/breakpoints';

export const CouponMainContainer = styled(MainContainer)`
	min-width: 40%;
	@media ${device.laptopS} {
		max-width: unset;
		margin-right: 2rem;
		margin-left: unset;
	}
	${TableCell} {
		@media ${device.mobileM} {
			padding: 1rem;
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
		@media ${device.mobileM} {
			padding: 1rem 0;
		}
		&:last-of-type {
			@media ${device.mobileM} {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
	${FormGroup} {
		@media ${device.mobileM} {
			margin-top: 1rem;
			flex-direction: column;
		}

		& ${FormElement} {
			@media ${device.mobileM} {
				margin-left: 0;
			}
			& input {
				@media ${device.mobileM} {
					width: unset;
				}
			}
		}
	}
`;

export const CouponContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 55rem;
`;

export const CouponFormWrapper = styled.div`
	margin-top: auto;
`;

export const CouponSpanLength = styled.span`
	position: absolute;
	top: 4rem;
	right: 2rem;
`;
