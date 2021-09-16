import styled from 'styled-components/macro';

export const ContentContainer = styled.ul`
	/* width: 80%; */
	margin-top: 3rem;
`;

export const ContentItem = styled.li`
	display: flex;
	padding: 0 1rem;
	padding-bottom: 3rem;
	&:not(:last-of-type) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	&:not(:first-of-type) {
		padding-top: 3rem;
	}
`;

export const ContentItemImage = styled.img`
	display: block;
	height: 20rem;
`;

export const ContentItemInfo = styled.div`
	/* margin-left: 2rem; */
	margin: 1rem 0 0 2rem;
`;

export const ContentItemHeading = styled.h2`
	font-size: 2rem;
`;

export const ContentItemDesc = styled.p`
	font-size: 1.4rem;
	/* padding: 0 2rem; */
	width: 80%;
	color: var(--color-grey-dark);
	font-style: italic;
	line-height: 1.4;
`;

export const ContentItemButton = styled.div`
	display: block;
	margin-left: auto;
	width: 13rem;
	margin-right: 1rem;
	margin-top: 1rem;
`;

export const ContentItemPrice = styled.span`
	font-family: 'Arvo', sans-serif;
	font-weight: 700;
	/* line-height: 1.4; */
	color: var(--color-primary);
	font-size: 2rem;
	display: block;
	margin-top: 1rem;
`;
