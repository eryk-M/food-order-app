import styled, { keyframes } from 'styled-components/macro';

export const SearchHint = styled.span`
	position: absolute;
	top: -3rem;
	background-color: var(--color-primary);
	color: #fff;
	padding: 0.5rem;
	border-radius: 5px;
	left: 0;
	opacity: ${(props) => {
		if (props.query.length === 0 || props.query.length >= 3) {
			return 0;
		} else return 1;
	}};
	transition: opacity 0.1s;
`;
export const SearchContainer = styled.div`
	width: ${(props) => props.width ?? ''};

	& input:focus + ${SearchHint} {
		opacity: ${(props) => {
			if (props.query.length === 0 || props.query.length < 3) {
				return 1;
			} else return 0;
		}};
	}
`;
