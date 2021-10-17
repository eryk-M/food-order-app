import React, { lazy, Suspense } from 'react';
import { Hero, Offer } from 'components';
import { Story } from 'pages';
import { Loader } from 'components';
const TopProducts = lazy(() => import('./TopProducts/TopProducts'));

export const Home = () => {
	return (
		<>
			<Hero />
			<Story />
			<Suspense fallback={<Loader primary high margincenter />}>
				<TopProducts />
			</Suspense>

			<Offer />
		</>
	);
};
