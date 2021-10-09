import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
100% {
    transform: rotate(360deg)
}
`;

const animateStroke = (props) => keyframes`
  0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke: ${props.primary ? 'var(--color-primary)' : '#fff'};
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
        stroke: ${props.primary ? 'var(--color-primary)' : '#fff'};
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
        stroke: ${props.primary ? 'var(--color-primary)' : '#fff'};
    }
`;

export const LoaderWrapper = styled.div`
	margin: 0px auto;
	width: 4rem;
	height: 4rem;
	min-height: ${(props) => {
		if (props.high) return '20rem';
		else if (props.veryhigh) return '50rem';
	}};
	margin-right: ${(props) => props.marginright};
	display: ${(props) =>
		props.margincenter ? 'flex' : 'inline-block'};
	align-items: ${(props) =>
		props.margincenter ? 'center' : 'normal'};
`;

export const LoaderSVG = styled.svg`
	animation: ${rotate} 1.5s ease-in-out infinite;
`;

export const LoaderCircle = styled.circle`
	fill: none;
	stroke-width: 0.5rem;
	animation: ${(props) => animateStroke(props)} 1.5s linear infinite;
	stroke-linecap: round;
	stroke: rgba(0, 0, 0, 0.5);
`;

export const LoaderCircleTwo = styled.circle`
	fill: none;
	stroke-width: 0.5rem;
	stroke-linecap: round;
	stroke: rgba(0, 0, 0, 0.1);
`;
