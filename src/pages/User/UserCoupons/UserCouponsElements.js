import styled from 'styled-components/macro';

import { HiOutlineEmojiSad } from 'react-icons/hi';

export const UserCouponsWrapper = styled.div`
	@media only screen and (max-width: 570px) {
		margin: 2rem;
	}
`;

export const UserCouponsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 2rem;
`;

export const UserCouponsNotAvailable = styled.p`
	font-size: 3rem;
	display: block;
	opacity: 0.1;
`;

export const SadIcon = styled(HiOutlineEmojiSad)`
	font-size: 10rem;
	vertical-align: middle;
`;
