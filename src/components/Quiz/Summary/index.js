import React from 'react';

import { useLocation, Redirect } from 'react-router';

const Summary = () => {
	const { data } = useLocation();

	console.log(data);

	// if (!data) return <Redirect to="/user/quizes" />;
	const calcScore = () => {
		return data.filter((el) => el.isCorrect).length;
	};

	return <h1>{calcScore()}</h1>;
};

export default Summary;
