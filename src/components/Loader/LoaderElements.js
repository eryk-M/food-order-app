import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
100% {
    transform: rotate(360deg)
}
`;

const animateStroke = ({ primary }) => keyframes`
  0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke: ${primary ? 'var(--color-primary)' : '#fff'};
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
        stroke: ${primary ? 'var(--color-primary)' : '#fff'};
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
        stroke: ${primary ? 'var(--color-primary)' : '#fff'};
    }
`;

export const LoaderWrapper = styled.div`
	margin: 0px auto;
	width: 4rem;
	height: 4rem;
	min-height: ${({ high, veryhigh }) => {
		if (high) return '20rem';
		else if (veryhigh) return '50rem';
	}};
	margin-right: ${({ marginright }) => marginright};
	display: ${({ margincenter }) =>
		margincenter ? 'flex' : 'inline-block'};
	align-items: ${({ margincenter }) =>
		margincenter ? 'center' : 'normal'};
`;

export const LoaderSVG = styled.svg`
	animation: ${rotate} 1.5s ease-in-out infinite;
`;

export const LoaderCircle = styled.circle`
	fill: none;
	stroke-width: 0.5rem;
	animation: ${({ primary }) => animateStroke({ primary })} 1.5s
		linear infinite;
	stroke-linecap: round;
	stroke: rgba(0, 0, 0, 0.5);
`;

export const LoaderCircleTwo = styled.circle`
	fill: none;
	stroke-width: 0.5rem;
	stroke-linecap: round;
	stroke: rgba(0, 0, 0, 0.1);
`;
