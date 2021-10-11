import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

import {
	MainContainer,
	Form,
	FormGroup,
	FormElement,
	FormBtn,
} from 'components';

export const AddQuizContainer = styled(MainContainer)`
	@media only screen and (max-width: 1100px) {
		margin-right: 2rem;
		margin-left: unset;
		max-width: unset;
	}

	${FormBtn} {
		box-shadow: none;
	}
`;

export const ContentWrapper = styled.div``;

export const ContentFormWrapper = styled.div`
	${FormGroup}:last-of-type {
		@media ${device.mobileL} {
			align-items: center;
		}
	}
	${FormGroup} {
		@media ${device.mobileL} {
			flex-direction: column;
		}

		${FormElement} {
			@media ${device.mobileL} {
				margin-left: 0;
			}
		}
	}
`;

export const ContentColumnWrapper = styled.div`
	${Form} {
		${FormGroup} {
			@media ${device.mobileL} {
				flex-direction: column;
			}

			& ${FormElement} {
				@media ${device.mobileL} {
					margin-left: 0;
				}
				& input {
					width: unset;
				}
			}
		}
	}
`;

export const ContentHeading = styled.p`
	font-size: 2rem;
	padding: 1rem 0;
	display: inline-block;
	margin: 2rem 0;

	@media ${device.mobileL} {
		font-size: 1.7rem;
	}
`;
