import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const FooterContainer = styled.footer`
	background-color: var(--color-footer);
	padding: 5rem 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

export const FooterMedia = styled.div`
	width: 30rem;
	display: flex;
	justify-content: space-between;
`;

export const FooterMediaIcon = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	/* outline: 1px solid var(--color-grey-light); */
	font-size: 1.6rem;
	color: var(--color-grey-light);
	cursor: pointer;
	transition: all 0.1s;
	background-color: ${(props) => {
		if (props.facebook) return '#4267b2;;';
		else if (props.instagram) return '#8a3ab9';
		else if (props.twitter) return '#1DA1F2';
		else if (props.youtube) return '#FF0000';
	}};
	& svg {
		font-size: 2rem;
	}
`;

export const FooterLogo = styled.img`
	display: block;
	height: 15rem;
	width: 15rem;
	object-fit: cover;
	margin: 4rem 0;
	/* width: 13rem; */
`;

export const FooterAddress = styled.ul`
	display: flex;
	color: var(--color-grey-light);
	font-size: 1.3rem;

	@media ${device.mobileM} {
		flex-direction: column;
		align-items: center;
	}
`;

export const FooterDetail = styled.li`
	padding: 0 1rem;
	font-weight: 100;
	&:not(:last-of-type) {
		border-right: 2px solid var(--color-primary);

		@media ${device.mobileM} {
			border-right: none;
		}
	}
	@media ${device.mobileM} {
		line-height: 1.7;
	}
`;

export const FooterCopy = styled.p`
	color: rgb(152, 152, 152);
	margin-top: 2rem;
	font-size: 1.3rem;
`;
