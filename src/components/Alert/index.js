// import React from 'react';

import { AlertContainer, AlertSuccessIcon } from './AlertElements';

export const Alert = (props) => {
	return (
		<AlertContainer {...props}>
			{props.success && <AlertSuccessIcon />} {props.children}
		</AlertContainer>
	);
};
