import styled from 'styled-components/macro';

import { FormContainer } from 'components';

import { device } from 'utils/breakpoints';
export const SignInContainer = styled(FormContainer)`
	width: 40rem;

	@media ${device.mobileM} {
		width: 100%;
	}
`;
