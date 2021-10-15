import React from 'react';
import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

const StatusNote = styled.p`
	display: inline-block;
	font-size: 1.6rem;

	color: ${({ step }) => {
		if (step === 0) {
			return '#fff;';
		} else if (step === 1 || step === 2 || step === 3) {
			return '#000';
		} else if (step === 4) {
			return '#194c22';
		} else {
			return '#969696';
		}
	}};
	background-color: ${({ step }) => {
		if (step === 0) {
			return '#52b7ff;';
		} else if (step === 1 || step === 2 || step === 3) {
			return '#ffbc00';
		} else if (step === 4) {
			return 'var(--color-green)';
		} else {
			return '#dedede';
		}
	}};
	opacity: ${({ step }) => (step === 5 ? '0.6' : '')};
	margin: 0 auto;
	border-radius: 1rem;
	padding: 0.4rem 1rem;
	@media ${device.mobileM} {
		margin: 0;
	}
`;

export const Status = ({ step }) => {
	const giveStepText = (step) => {
		switch (step) {
			case 0:
				return 'New';
			case 1:
			case 2:
			case 3:
				return 'In progress';
			case 4:
				return 'Done';
			case 5:
				return 'Cancelled';
			default:
				break;
		}
	};
	return (
		<StatusNote step={step} data-testid="status-step">
			{giveStepText(step)}
		</StatusNote>
	);
};
