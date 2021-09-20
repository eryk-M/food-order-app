// import React from 'react';

import { AlertContainer, AlertSuccessIcon } from './AlertElements';

export const Alert = (props) => {
	return (
		<AlertContainer right={props.right} top={props.top} {...props}>
			{props.success && <AlertSuccessIcon />} {props.children}
		</AlertContainer>
	);
};
