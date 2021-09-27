import React from 'react';

import { FullWidthContainer } from '../Containers';
import {
	InfoIconWrapper,
	InfoNoteHeading,
	InfoNote,
	InfoP,
} from './InfoElements';

import { InfoIcon } from '../Icons';
const Info = () => {
	return (
		<FullWidthContainer>
			<InfoIconWrapper>
				<InfoIcon />
			</InfoIconWrapper>
			<InfoNote>
				<InfoNoteHeading>Information</InfoNoteHeading>
				<InfoP>
					- Data in Admin Panel are coming from different collection
					to prevent damage to the main page. You can easily test add,
					edit and delete functions. <br />- Data in Dashboard are
					generating randomly every refresh.
				</InfoP>
			</InfoNote>
		</FullWidthContainer>
	);
};

export default Info;
