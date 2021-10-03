import styled from 'styled-components/macro';

export const UserContainer = styled.div`
	min-height: 50rem;
	box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
	margin: 3rem auto;
	background-color: white;
	display: flex;
	/* position: relative; */
	@media screen and (max-width: 570px) {
		flex-direction: column;
	}
`;

export const UserContent = styled.div`
	margin: ${(props) => props.margin};
	width: ${(props) =>
		props.pathname === '/user/quizes' ? '100%' : ''};
	@media screen and (max-width: 570px) {
		width: 100%;
		margin: 2rem auto;
	}
`;

export const UserHeading = styled.h1`
	padding-left: 1rem;
	font-family: 'Rubik', sans-serif;
	text-transform: capitalize;
	font-size: 3rem;
`;

export const UserWrapper = styled.div`
	max-width: 120rem;
	margin: 2rem auto;
`;

export const UserDesc = styled.p`
	color: var(--color-grey-dark);
	margin-top: 1rem;
	font-size: 1.6rem;
	padding-left: 1rem;
`;
