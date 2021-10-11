import React from 'react';

import { FullWidthContainer, InfoIcon } from 'components';
import {
	InfoIconWrapper,
	InfoNoteHeading,
	InfoNote,
	InfoP,
} from './InfoElements';

export const Info = ({ children }) => {
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
