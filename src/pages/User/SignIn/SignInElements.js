import styled from 'styled-components/macro';

import {
	FormContainer,
	FormHeading,
} from 'components/Form/FormElements';

import { device } from 'utils/breakpoints';
export const SignInContainer = styled(FormContainer)`
	/* min-width: 50%; */
	width: 40rem;

	@media ${device.laptopM} {
		width: 30rem;
	}

	@media ${device.tablet} {
		width: 30rem;
	}

	@media only screen and (max-width: 840px) {
		min-width: unset;
		width: 35rem;
	}

	${FormHeading} {
		font-size: 2.3rem;
	}
`;
