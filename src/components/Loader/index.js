import React from 'react';

import './loader.css';
import styled from 'styled-components/macro';

const LoaderWrapper = styled.div`
	display: ${(props) => props.display ?? 'flex'};
	justify-content: center;
	align-items: center;
	/* display: inline-block; */
	vertical-align: middle;
	margin-left: ${(props) => props.marginleft ?? ''};
	& .lds-ring div {
		border-color: ${(props) =>
			props.primary
				? 'var(--color-primary) transparent transparent transparent'
				: '#fff transparent transparent transparent'};
	}
`;

const Loader = ({ primary, ...rest }) => {
	// const styles = {
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// };
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
