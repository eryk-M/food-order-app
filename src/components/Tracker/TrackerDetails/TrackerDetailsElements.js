import styled from 'styled-components/macro';
import { CgCheckO } from 'react-icons/cg';

export const TrackerDetailsContainer = styled.section`
	max-width: 110rem;
	margin: 0 auto;
	padding: 0 2rem;
`;

export const TrackerDetailsIconCheck = styled(CgCheckO)``;

export const TrackerDetailsContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 8rem;
	border: 1px solid #e7272d38;
	width: 90%;
	margin: 8rem auto 5rem auto;
	padding: 5rem 0;
	border-radius: 2rem;
`;

export const TrackerDetailsHeading = styled.h1`
	font-weight: 400;
	font-size: 3.2rem;
	font-family: 'Rubik', sans-serif;
`;

export const TrackerDetailsNote = styled.p`
	font-weight: bold;
	/* text-align: right; */
	font-size: 3.2rem;
	margin-top: 2rem;
`;
