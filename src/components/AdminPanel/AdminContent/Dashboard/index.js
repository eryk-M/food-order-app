import React from 'react';

import {
	FlexCenterContainer,
	LineChartsContainer,
} from 'components/AdminPanel/Containers';

import Total from './Total';
import LineChart from './LineChart';

import {
	salesDataYear,
	salesDataMonth,
	generateArrayDays,
	ordersDataYear,
	ordersDataMonth,
} from 'utils/lineChartsData';

const Dashboard = () => {
	return (
		<>
			<FlexCenterContainer>
				<Total
					spanColor="#3ac47d"
					top="Total orders"
					bottom="Total orders number"
					number={3}
				/>
				<Total
					spanColor="#f7b924"
					top="Total income"
					bottom="Total clients profit"
					number="$12"
				/>
				<Total
					spanColor="#d92550"
					top="Total users"
					bottom="People registered"
					number={10}
				/>
			</FlexCenterContainer>
			<LineChartsContainer>
				<LineChart
					array={salesDataYear}
					days={generateArrayDays(12)}
					color="#45de66"
					text="$ 874"
					span="sales last year"
				/>
				<LineChart
					array={salesDataMonth}
					days={generateArrayDays(30)}
					color="#e7272d"
					text="$ 874"
					span="sales last month"
				/>
				<LineChart
					array={ordersDataYear}
					days={generateArrayDays(12)}
					color="#f7b924"
					text="$ 874"
					span="orders last years"
				/>
				<LineChart
					array={ordersDataMonth}
					days={generateArrayDays(30)}
					color="#1fa2ff"
					text="$ 874"
					span="orders last month"
				/>
			</LineChartsContainer>
		</>
	);
};

export default Dashboard;
