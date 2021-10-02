import React from 'react';

import './loader.css';
import styled from 'styled-components/macro';

const LoaderWrapper = styled.div`
	display: ${(props) => props.display ?? 'flex'};
	justify-content: center;
	align-items: center;
	vertical-align: middle;
	margin: ${(props) => (props.margincenter ? '4rem 0' : '')};
	margin-left: ${(props) => props.marginleft ?? ''};
	min-height: ${(props) => {
		if (props.high) return '20rem';
		else if (props.veryhigh) return '50rem';
	}};
	& .lds-ring div {
		border-color: ${(props) =>
			props.primary
				? 'var(--color-primary) transparent transparent transparent'
				: '#fff transparent transparent transparent'};
	}
`;

const Loader = ({ primary, ...rest }) => {
	return (
		<LoaderWrapper
			className="loader-wrapper"
			primary={primary}
			{...rest}
		>
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</LoaderWrapper>
	);
};

export default Loader;
