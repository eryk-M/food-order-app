import React from 'react';

import './loader.css';

const Loader = () => {
	const styles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};
	return (
		<div style={styles}>
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
