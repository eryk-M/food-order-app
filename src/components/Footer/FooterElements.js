import styled from 'styled-components/macro';

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

export const FooterMediaIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5.2rem;
	height: 5.2rem;
	border-radius: 50%;
	border: 2px solid var(--color-grey-light);
	font-size: 1.6rem;
	color: var(--color-grey-light);
	cursor: pointer;
	transition: all 0.1s;
	&:hover {
		${(props) => {
			if (props.facebook)
				return 'border: 2px solid #4267b2;color: #4267b2;';
			else if (props.instagram)
				return 'border: 2px solid #8a3ab9;color:#8a3ab9';
			else if (props.twitter)
				return 'border: 2px solid #1DA1F2;color:#1DA1F2';
			else if (props.youtube)
				return 'border: 2px solid #FF0000;color:#FF0000';
		}}
	}
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
`;

export const FooterDetail = styled.li`
	padding: 0 1rem;
	font-weight: 100;
	&:not(:last-of-type) {
		border-right: 2px solid var(--color-primary);
	}
`;

export const FooterCopy = styled.p`
	color: rgb(152, 152, 152);
	margin-top: 2rem;
	font-size: 1.3rem;
`;
