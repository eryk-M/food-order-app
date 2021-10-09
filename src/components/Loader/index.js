import React from 'react';

import {
	LoaderWrapper,
	LoaderSVG,
	LoaderCircle,
	LoaderCircleTwo,
} from './LoaderElements';

const Loader = ({ primary, high, veryhigh, ...rest }) => {
	return (
		<LoaderWrapper
			high={high ? 1 : 0}
			veryhigh={veryhigh ? 1 : 0}
			{...rest}
		>
			<LoaderSVG viewBox="25 25 50 50">
				<LoaderCircleTwo cx="50" cy="50" r="20"></LoaderCircleTwo>
				<LoaderCircle
					primary={primary}
					cx="50"
					cy="50"
					r="20"
				></LoaderCircle>
			</LoaderSVG>
		</LoaderWrapper>
	);
};

export default Loader;
