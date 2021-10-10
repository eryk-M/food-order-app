import React from 'react';

import { FullWidthContainer } from '../Containers';
import {
	InfoIconWrapper,
	InfoNoteHeading,
	InfoNote,
	InfoP,
} from './InfoElements';

import { InfoIcon } from '../Icons';
const Info = ({ children }) => {
	return (
		<FullWidthContainer>
			<InfoIconWrapper>
				<InfoIcon />
			</InfoIconWrapper>
			<InfoNote>
				<InfoNoteHeading>Information</InfoNoteHeading>
				<InfoP>{children}</InfoP>
			</InfoNote>
		</FullWidthContainer>
	);
};

export default Info;
